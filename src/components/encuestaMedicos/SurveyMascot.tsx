"use client";

import { useEffect, useRef, useState, type PointerEvent } from "react";

type Phase = "stand" | "walk" | "tremor" | "fall" | "bounce" | "climb" | "drag" | "fly";
type View = "front" | "back" | "side";
type Pt = { x: number; y: number };
type Motion = { ms: number; ease: string };
type Spin = { angle: number; ms: number; origin: string };
type Timer = ReturnType<typeof setTimeout>;
type Sample = { t: number; x: number; y: number };

const MASCOT_W = 40;
const MASCOT_H = 60;
const WALK_SPEED = 0.06; // px per ms — slow enough that the feet don't skate
const WALK_EASE = "cubic-bezier(0.25,0,0.75,1)";
const GRAVITY_EASE = "cubic-bezier(0.55,0,1,0.45)";
const CLIMB_EASE = "cubic-bezier(0.4,0,0.5,1)";
// Below this width there's no page margin to walk in, so a left lane is
// carved out of the answers column instead (see QuestionScreen's `pl-12`).
const WIDE_QUERY = "(min-width: 768px)";
const T_TREMOR = 250;
const T_FALL = 420;
const T_BOUNCE = 380;
// Keep in sync with `.mascot-climb` duration in encuesta.css (sum = 1.28s).
const T_CLIMB_1 = 450;
const T_SLIP = 180;
const T_CLIMB_2 = 650;

// Throw physics, in px and ms.
const GRAVITY = 0.0024;
const MAX_THROW = 2.4;
const WALL_DAMPING = 0.55;
const FLOOR_DAMPING = 0.42;
const SETTLE_SPEED = 0.25; // slower than this on hitting the floor = it stays down
const SPIN_PER_SPEED = 0.35; // deg/ms of tumble per px/ms of sideways speed
const CEILING = -40; // the wrapper's pt-10 headroom
const VELOCITY_WINDOW = 90; // ms of pointer history used for the throw
const MAX_FLIGHT_FRAMES = 600; // ~10s at 60fps
// The figure's own pivot (`.mascot-figure` transform-origin: 50% 60%), so
// a landing can hand its spin over to the bounce keyframes without a jump.
const FIGURE_PIVOT = "20px 36px";

const rand = (min: number, max: number) => min + Math.random() * (max - min);
const clamp = (v: number, min: number, max: number) => Math.min(max, Math.max(min, v));
const normalizeDeg = (deg: number) => ((((deg + 180) % 360) + 360) % 360) - 180;

function throwVelocity(samples: Sample[], now: number): Pt {
  const recent = samples.filter((s) => now - s.t < VELOCITY_WINDOW);
  if (recent.length < 2) return { x: 0, y: 0 };
  const a = recent[0];
  const b = recent[recent.length - 1];
  const dt = Math.max(1, b.t - a.t);
  const v = { x: (b.x - a.x) / dt, y: (b.y - a.y) / dt };
  const speed = Math.hypot(v.x, v.y);
  return speed > MAX_THROW ? { x: (v.x / speed) * MAX_THROW, y: (v.y / speed) * MAX_THROW } : v;
}

/**
 * Articulated ragdoll doctor that wanders the question screen: it picks a
 * random destination among a few sensible spots (beside a card on either
 * side, across the cards, up on the progress bar), walks there — in profile
 * when going sideways, facing you going down, from behind going up — stands
 * around for a random while, and picks another. Every time `bump`
 * increments (a question was answered) it trembles, falls to the bottom of
 * the answers, bounces, and climbs back up, slipping once.
 *
 * It can also be grabbed (finger or mouse): it dangles from where it was
 * held, and on release is thrown with the pointer's velocity — real
 * gravity, wall/floor bounces and tumble, simulated per frame — then lands
 * and climbs back up like after an answer.
 *
 * Must be rendered inside the `relative` wrapper that also holds the
 * progress bar and the (keyed, remounting) question screen; `rail` is that
 * screen's answer-options block.
 */
export default function SurveyMascot({
  rail,
  rowCount,
  bump,
}: {
  rail: HTMLElement | null;
  rowCount: number;
  bump: number;
}) {
  const [pos, setPos] = useState<Pt>({ x: 0, y: 0 });
  const [motion, setMotion] = useState<Motion>({ ms: 0, ease: "linear" });
  const [phase, setPhase] = useState<Phase>("stand");
  const [view, setView] = useState<View>("front");
  const [flip, setFlip] = useState(false);
  const [placed, setPlaced] = useState(false);
  const [spin, setSpin] = useState<Spin>({ angle: 0, ms: 0, origin: FIGURE_PIVOT });
  const selfRef = useRef<HTMLDivElement>(null);

  // Timers fire long after the render that scheduled them, and the layout
  // changes under them (new question mid-fall) — so everything they read
  // lives in refs.
  const geo = useRef({ railTop: 0, railHeight: 0, barTop: 0, width: 0, height: 0, wide: false });
  const held = useRef<{ id: number; ox: number; oy: number; samples: Sample[] } | null>(null);
  const flying = useRef(false);
  const flightFrame = useRef(0);
  const spinAngle = useRef(0);
  const rows = useRef(rowCount);
  const posRef = useRef<Pt>({ x: 0, y: 0 });
  const busy = useRef(false);
  const hasPlaced = useRef(false);
  const lastRail = useRef<HTMLElement | null>(null);
  const lastBump = useRef(bump);
  const wanderTimer = useRef<Timer | null>(null);
  // Bumped on every change of plan: a wander callback from an older plan
  // sees a different generation and does nothing, even if its handle was lost.
  const wanderGen = useRef(0);
  const phaseTimers = useRef<Timer[]>([]);

  useEffect(() => {
    rows.current = rowCount;
  }, [rowCount]);

  const laneX = () => (geo.current.wide ? -(MASCOT_W + 16) : 0);
  const cardsLeft = () => (geo.current.wide ? 0 : 48);

  function rowY(i: number) {
    const g = geo.current;
    if (rows.current <= 1 || g.railHeight <= 0) return g.railTop;
    return g.railTop + (i / (rows.current - 1)) * Math.max(0, g.railHeight - MASCOT_H);
  }

  function bottomY() {
    const g = geo.current;
    return g.railTop + Math.max(g.railHeight - MASCOT_H * 0.3, MASCOT_H);
  }

  function go(p: Pt, ms = 0, ease = "linear") {
    posRef.current = p;
    setMotion({ ms, ease });
    setPos(p);
  }

  // Where it is on screen right now, mid-transition included.
  function livePos(): Pt {
    const el = selfRef.current;
    if (!el) return posRef.current;
    const cs = getComputedStyle(el);
    return { x: parseFloat(cs.left), y: parseFloat(cs.top) };
  }

  function stopWander() {
    wanderGen.current++;
    if (wanderTimer.current) {
      clearTimeout(wanderTimer.current);
      wanderTimer.current = null;
    }
  }

  function scheduleWander(fn: () => void, ms: number) {
    const gen = wanderGen.current;
    wanderTimer.current = setTimeout(() => {
      if (gen === wanderGen.current) fn();
    }, ms);
  }

  function pickTarget(): Pt {
    const g = geo.current;
    const anyRow = () => rowY(Math.floor(Math.random() * rows.current));
    const spots: [weight: number, make: () => Pt][] = [
      [3, () => ({ x: laneX(), y: anyRow() })],
      [g.wide ? 2 : 0, () => ({ x: g.width + 16, y: anyRow() })],
      [2, () => ({ x: rand(cardsLeft(), g.width - MASCOT_W), y: anyRow() })],
      [1.5, () => ({ x: rand(0, g.width - MASCOT_W), y: g.barTop - MASCOT_H + 4 })],
    ];
    const total = spots.reduce((sum, [w]) => sum + w, 0);
    let target = posRef.current;
    for (let attempt = 0; attempt < 6; attempt++) {
      let r = Math.random() * total;
      const [, make] = spots.find(([w]) => (r -= w) < 0) ?? spots[0];
      target = make();
      const { x, y } = posRef.current;
      if (Math.hypot(target.x - x, target.y - y) > 50) break;
    }
    return target;
  }

  function walkTo(target: Pt, then: () => void) {
    const from = posRef.current;
    const dx = target.x - from.x;
    const dy = target.y - from.y;
    const ms = Math.max(450, Math.hypot(dx, dy) / WALK_SPEED);
    if (Math.abs(dx) >= Math.abs(dy)) {
      setView("side");
      setFlip(dx < 0);
    } else {
      setView(dy > 0 ? "front" : "back");
      setFlip(false);
    }
    setPhase("walk");
    go(target, ms, WALK_EASE);
    scheduleWander(then, ms);
  }

  function standThenWander(ms = rand(900, 2600)) {
    stopWander();
    setPhase("stand");
    setView("front");
    setFlip(false);
    scheduleWander(() => walkTo(pickTarget(), () => standThenWander()), ms);
  }

  // New rail = new question on screen. Measure it (offsetTop chain ignores
  // the slide-in transform). Unless a fall is playing — which resumes the
  // wandering itself — head somewhere on the new screen.
  useEffect(() => {
    const host = selfRef.current?.parentElement;
    if (!rail || !host) return;

    const measure = () => {
      let y = 0;
      let node: HTMLElement | null = rail;
      while (node && node !== host) {
        y += node.offsetTop;
        node = node.offsetParent as HTMLElement | null;
      }
      const bar = host.querySelector<HTMLElement>(".em-progress-track");
      geo.current = {
        railTop: y,
        railHeight: rail.offsetHeight,
        barTop: bar?.offsetTop ?? 0,
        width: host.clientWidth,
        height: host.clientHeight,
        wide: window.matchMedia(WIDE_QUERY).matches,
      };
    };

    measure();
    // Dev StrictMode re-runs this effect with the same rail: that's not a
    // new question, so don't treat it as one.
    const isNewRail = rail !== lastRail.current;
    lastRail.current = rail;
    if (!hasPlaced.current) {
      hasPlaced.current = true;
      go({ x: laneX(), y: rowY(0) });
      standThenWander();
    } else if (!busy.current) {
      stopWander();
      posRef.current = livePos();
      if (isNewRail) walkTo(pickTarget(), () => standThenWander());
      else standThenWander();
    }
    // First placement snaps into place (no transition) before fading in. A
    // timeout rather than rAF: rAF never fires in a background tab.
    const reveal = setTimeout(() => setPlaced(true), 50);

    const ro = new ResizeObserver(measure);
    ro.observe(rail);
    ro.observe(host);
    return () => {
      clearTimeout(reveal);
      ro.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rail]);

  // Drop every plan in flight: wandering, a fall/climb sequence, a throw.
  function cancelPlans() {
    stopWander();
    phaseTimers.current.forEach(clearTimeout);
    phaseTimers.current = [];
    cancelAnimationFrame(flightFrame.current);
    flying.current = false;
  }

  function sequence(steps: [delay: number, fn: () => void][]) {
    let t = 0;
    for (const [delay, fn] of steps) {
      t += delay;
      phaseTimers.current.push(setTimeout(fn, t));
    }
  }

  // Lying on the floor at (x, floorY), mid-bounce: climb back up to the top
  // of the answers — seen from behind, slipping once — and go back to
  // wandering.
  function climbBackUp(x: number, floorY: number) {
    const climbY = (fraction: number) => floorY + (geo.current.railTop - floorY) * fraction;
    sequence([
      [
        T_BOUNCE,
        () => {
          setPhase("climb");
          setView("back");
          go({ x, y: climbY(0.6) }, T_CLIMB_1, CLIMB_EASE);
        },
      ],
      [T_CLIMB_1, () => go({ x, y: climbY(0.45) }, T_SLIP, GRAVITY_EASE)],
      [T_SLIP, () => go({ x, y: geo.current.railTop }, T_CLIMB_2, CLIMB_EASE)],
      [
        T_CLIMB_2,
        () => {
          busy.current = false;
          standThenWander(rand(400, 1200));
        },
      ],
    ]);
  }

  useEffect(() => {
    // Only a real change of `bump` is an answer — not the mount, and not
    // StrictMode's dev-only second run of this effect.
    if (bump === lastBump.current) return;
    lastBump.current = bump;
    // Already being held or thrown: it's falling anyway.
    if (held.current || flying.current) return;

    busy.current = true;
    cancelPlans();

    // Freeze exactly where it is (it may be mid-walk), then drop straight down.
    const { x, y } = livePos();
    go({ x, y });
    setView("front");
    setFlip(false);
    setPhase("tremor");
    sequence([
      [
        T_TREMOR,
        () => {
          setPhase("fall");
          go({ x, y: bottomY() }, T_FALL, GRAVITY_EASE);
        },
      ],
      [
        T_FALL,
        () => {
          setPhase("bounce");
          climbBackUp(x, bottomY());
        },
      ],
    ]);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [bump]);

  useEffect(() => {
    return () => cancelPlans();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /* ---- grab, drag, throw ---- */

  function bounds() {
    const g = geo.current;
    return {
      xMin: g.wide ? -(MASCOT_W + 16) : 0,
      xMax: g.wide ? g.width + 16 : g.width - MASCOT_W,
      yMin: CEILING,
      yMax: Math.max(CEILING, g.height - MASCOT_H),
    };
  }

  function pointerInHost(e: PointerEvent): Pt {
    const r = selfRef.current!.parentElement!.getBoundingClientRect();
    return { x: e.clientX - r.left, y: e.clientY - r.top };
  }

  function onGrab(e: PointerEvent<HTMLDivElement>) {
    if (e.pointerType === "mouse" && e.button !== 0) return;
    e.preventDefault();
    e.currentTarget.setPointerCapture(e.pointerId);
    cancelPlans();
    busy.current = true;

    const at = livePos();
    const p = pointerInHost(e);
    const ox = p.x - at.x;
    const oy = p.y - at.y;
    held.current = { id: e.pointerId, ox, oy, samples: [{ t: e.timeStamp, ...p }] };
    go(at);
    setView("front");
    setFlip(false);
    setPhase("drag");
    // Dangle from the exact point that was grabbed.
    spinAngle.current = 0;
    setSpin({ angle: 0, ms: 150, origin: `${ox}px ${oy}px` });
  }

  function onDrag(e: PointerEvent<HTMLDivElement>) {
    const h = held.current;
    if (!h || e.pointerId !== h.id) return;
    const p = pointerInHost(e);
    h.samples.push({ t: e.timeStamp, ...p });
    h.samples = h.samples.filter((s) => e.timeStamp - s.t < VELOCITY_WINDOW);
    const b = bounds();
    go({ x: clamp(p.x - h.ox, b.xMin, b.xMax), y: clamp(p.y - h.oy, b.yMin, b.yMax) });
    // Body lags behind the hand: dragged right, it swings left (positive
    // rotation for something hanging below its pivot).
    const swing = clamp(throwVelocity(h.samples, e.timeStamp).x * 30, -45, 45);
    spinAngle.current = swing;
    setSpin((s) => ({ ...s, angle: swing, ms: 150 }));
  }

  function onRelease(e: PointerEvent<HTMLDivElement>) {
    const h = held.current;
    if (!h || e.pointerId !== h.id) return;
    held.current = null;
    fly(posRef.current, throwVelocity(h.samples, e.timeStamp));
  }

  function fly(start: Pt, v: Pt) {
    const b = bounds();
    // Let go above the answers: falls to their bottom. Let go below them:
    // falls to the bottom of the screen.
    const floor = start.y <= bottomY() ? bottomY() : b.yMax;
    let { x, y } = start;
    let { x: vx, y: vy } = v;
    let angle = spinAngle.current;
    let spinSpeed = vx * SPIN_PER_SPEED + rand(-0.1, 0.1);
    let last: number | null = null;
    let frames = 0;

    flying.current = true;
    setPhase("fly");

    const tick = (now: number) => {
      // rAF timestamps can predate the moment the throw started, and a
      // negative dt would run gravity backwards; clamp it, and cap the run
      // so no edge case can keep it in the air forever.
      const dt = last === null ? 16 : clamp(now - last, 0, 32);
      last = now;
      if (++frames > MAX_FLIGHT_FRAMES) {
        go({ x: clamp(x, b.xMin, b.xMax), y: floor });
        land(clamp(x, b.xMin, b.xMax), floor, angle);
        return;
      }
      vy += GRAVITY * dt;
      x += vx * dt;
      y += vy * dt;
      angle += spinSpeed * dt;

      if (x < b.xMin || x > b.xMax) {
        x = clamp(x, b.xMin, b.xMax);
        vx = -vx * WALL_DAMPING;
        spinSpeed = -spinSpeed * 0.7;
      }
      if (y < b.yMin) {
        y = b.yMin;
        vy = -vy * 0.5;
      }
      if (y >= floor) {
        y = floor;
        if (vy > SETTLE_SPEED) {
          vy = -vy * FLOOR_DAMPING;
          vx *= 0.7;
          spinSpeed *= 0.6;
        } else {
          go({ x, y });
          land(x, floor, angle);
          return;
        }
      }

      go({ x, y });
      spinAngle.current = angle;
      setSpin((s) => ({ ...s, angle, ms: 0 }));
      flightFrame.current = requestAnimationFrame(tick);
    };
    flightFrame.current = requestAnimationFrame(tick);
  }

  function land(x: number, floorY: number, angle: number) {
    flying.current = false;
    setPhase("bounce");
    // The bounce keyframes start the figure lying at -470deg (≡ -110deg).
    // Re-express the spin relative to that so the total angle doesn't jump,
    // then ease the spin out and let the keyframes take over.
    const handover = normalizeDeg(angle + 110);
    spinAngle.current = 0;
    setSpin({ angle: handover, ms: 0, origin: FIGURE_PIVOT });
    phaseTimers.current.push(
      setTimeout(() => setSpin({ angle: 0, ms: 350, origin: FIGURE_PIVOT }), 20)
    );
    climbBackUp(x, floorY);
  }

  const move = `${motion.ms}ms ${motion.ease}`;

  return (
    <div
      ref={selfRef}
      className="pointer-events-none absolute z-10"
      style={{
        left: pos.x,
        top: pos.y,
        opacity: placed ? 1 : 0,
        transition: placed ? `left ${move}, top ${move}, opacity 0.3s ease` : "none",
      }}
      aria-hidden="true"
    >
      {/* Physics rotation (dangling, tumbling) lives here, separate from the
          figure's own keyframe animations so the two never fight. */}
      <div
        style={{
          transform: `rotate(${spin.angle}deg)`,
          transformOrigin: spin.origin,
          transition: spin.ms ? `transform ${spin.ms}ms ease-out` : "none",
        }}
      >
        <div className={`mascot-figure mascot-${phase}`}>
          {view === "side" ? <MascotSide flip={flip} /> : <MascotFront back={view === "back"} />}
        </div>
      </div>
      {/* Grab handle: bigger than the thin limbs so a finger can catch it.
          touch-none keeps the page from scrolling while it's being dragged. */}
      <div
        className={`pointer-events-auto absolute -inset-x-1 -top-1 h-[66px] touch-none select-none ${
          phase === "drag" ? "cursor-grabbing" : "cursor-grab"
        }`}
        onPointerDown={onGrab}
        onPointerMove={onDrag}
        onPointerUp={onRelease}
        onPointerCancel={onRelease}
      />
    </div>
  );
}

/* ---------------------------------------------------------------------- */
/* Drawing. Every joint is its own nested <g>, so a child (forearm, shin)  */
/* rides along with its parent's rotation. Pivots live in encuesta.css.    */
/* ---------------------------------------------------------------------- */

type Shape =
  | { rect: [x: number, y: number, w: number, h: number, r: number] }
  | { circle: [cx: number, cy: number, r: number] }
  | { ellipse: [cx: number, cy: number, rx: number, ry: number] };

const OUTLINE = {
  fill: "var(--mascot-stroke)",
  stroke: "var(--mascot-stroke)",
  strokeWidth: 2.4,
  strokeLinejoin: "round" as const,
};
const PART = {
  fill: "var(--mascot-body)",
  stroke: "var(--mascot-stroke)",
  strokeWidth: 1.2,
  strokeLinejoin: "round" as const,
};
const LINE = {
  stroke: "var(--mascot-stroke)",
  strokeWidth: 1,
  strokeLinecap: "round" as const,
  fill: "none",
};

function draw(shape: Shape, props: object, key?: number) {
  if ("rect" in shape) {
    const [x, y, width, height, rx] = shape.rect;
    return <rect key={key} x={x} y={y} width={width} height={height} rx={rx} {...props} />;
  }
  if ("circle" in shape) {
    const [cx, cy, r] = shape.circle;
    return <circle key={key} cx={cx} cy={cy} r={r} {...props} />;
  }
  const [cx, cy, rx, ry] = shape.ellipse;
  return <ellipse key={key} cx={cx} cy={cy} rx={rx} ry={ry} {...props} />;
}

/**
 * A two-segment limb (thigh+shin+foot, upper arm+forearm+hand) drawn in two
 * passes: all the black silhouette first, then all the fill on top. That
 * merges the segments into one continuous outline — no line at the elbow or
 * knee — while each segment still rotates on its own joint. The child group
 * is rendered twice with the same class, so both passes animate together.
 */
function Limb({
  cls,
  upper,
  childCls,
  lower,
  fill = "var(--mascot-body)",
}: {
  cls: string;
  upper: Shape;
  childCls: string;
  lower: Shape[];
  fill?: string;
}) {
  return (
    <g className={cls}>
      {draw(upper, OUTLINE)}
      <g className={childCls}>{lower.map((s, i) => draw(s, OUTLINE, i))}</g>
      {draw(upper, { fill })}
      <g className={childCls}>{lower.map((s, i) => draw(s, { fill }, i))}</g>
    </g>
  );
}

function MascotFront({ back }: { back: boolean }) {
  return (
    <svg
      width={MASCOT_W}
      height={MASCOT_H}
      viewBox="0 0 40 60"
      fill="none"
      overflow="visible"
      className={back ? "m-back" : undefined}
    >
      <g className="m-body">
        <Limb
          cls="m-leg m-leg-l"
          upper={{ rect: [14.7, 34, 4.4, 11.4, 2.2] }}
          childCls="m-shin m-shin-l"
          lower={[{ rect: [14.8, 43.8, 4.2, 10.8, 2.1] }, { ellipse: [16.1, 55.4, 3.5, 2] }]}
        />
        <Limb
          cls="m-leg m-leg-r"
          upper={{ rect: [20.9, 34, 4.4, 11.4, 2.2] }}
          childCls="m-shin m-shin-r"
          lower={[{ rect: [21, 43.8, 4.2, 10.8, 2.1] }, { ellipse: [23.9, 55.4, 3.5, 2] }]}
        />

        <g className="m-torso">
          <rect x="13" y="17.5" width="14" height="19.5" rx="6.5" {...PART} />
          {/* Lab coat: lapels, front opening and a red-cross badge. */}
          <g className="m-front">
            <path d="M16.6 18.4 L20 25 L23.4 18.4" {...LINE} />
            <line x1="20" y1="25" x2="20" y2="36.4" {...LINE} />
            <rect x="23.3" y="27.2" width="1.4" height="4.2" rx="0.3" fill="var(--mascot-cross)" />
            <rect x="21.9" y="28.6" width="4.2" height="1.4" rx="0.3" fill="var(--mascot-cross)" />
          </g>
          <g className="m-backside">
            <line x1="20" y1="28" x2="20" y2="36.4" {...LINE} />
          </g>

          <Limb
            cls="m-arm m-arm-l"
            upper={{ rect: [10.3, 18.8, 3.8, 10.8, 1.9] }}
            childCls="m-fore m-fore-l"
            lower={[{ rect: [10.4, 27.6, 3.6, 9, 1.8] }, { circle: [12.2, 37.4, 2.2] }]}
          />
          <Limb
            cls="m-arm m-arm-r"
            upper={{ rect: [25.9, 18.8, 3.8, 10.8, 1.9] }}
            childCls="m-fore m-fore-r"
            lower={[{ rect: [26, 27.6, 3.6, 9, 1.8] }, { circle: [27.8, 37.4, 2.2] }]}
          />

          <g className="m-head">
            <rect x="18.3" y="14.5" width="3.4" height="4" rx="1.2" {...PART} />
            <circle cx="20" cy="9.3" r="7.2" {...PART} />
            <g className="m-front m-eyes">
              <circle cx="17.4" cy="9.4" r="0.95" fill="var(--mascot-stroke)" />
              <circle cx="22.6" cy="9.4" r="0.95" fill="var(--mascot-stroke)" />
            </g>
          </g>
        </g>
      </g>
    </svg>
  );
}

// Profile, facing right (mirrored with `.m-flip` to walk left). Far-side
// limbs are a shade darker and drawn behind the body for depth.
function MascotSide({ flip }: { flip: boolean }) {
  const shade = "var(--mascot-shade)";
  const leg = {
    upper: { rect: [17.8, 34, 4.4, 11.4, 2.2] } as Shape,
    lower: [{ rect: [17.9, 43.8, 4.2, 10.8, 2.1] }, { ellipse: [21.4, 55.5, 3.9, 1.9] }] as Shape[],
  };
  const arm = {
    upper: { rect: [18.1, 18.8, 3.8, 10.8, 1.9] } as Shape,
    lower: [{ rect: [18.2, 27.6, 3.6, 9, 1.8] }, { circle: [20, 37.4, 2.2] }] as Shape[],
  };
  return (
    <svg
      width={MASCOT_W}
      height={MASCOT_H}
      viewBox="0 0 40 60"
      fill="none"
      overflow="visible"
      className={flip ? "m-flip" : undefined}
    >
      <g className="s-body">
        <Limb cls="s-arm s-arm-f" childCls="s-fore s-fore-f" {...arm} fill={shade} />
        <Limb cls="s-leg s-leg-f" childCls="s-shin s-shin-f" {...leg} fill={shade} />
        <Limb cls="s-leg s-leg-n" childCls="s-shin s-shin-n" {...leg} />

        <rect x="14.5" y="17.5" width="11" height="19.5" rx="5.5" {...PART} />
        <path d="M22.8 18.6 L24.6 23.6" {...LINE} />
        <rect x="21.4" y="26.6" width="1.3" height="3.8" rx="0.3" fill="var(--mascot-cross)" />
        <rect x="20.15" y="27.85" width="3.8" height="1.3" rx="0.3" fill="var(--mascot-cross)" />

        <g className="s-head">
          <rect x="18.3" y="14.5" width="3.4" height="4" rx="1.2" {...PART} />
          <circle cx="20" cy="9.3" r="7.2" {...PART} />
          <circle cx="24.6" cy="9.2" r="0.95" fill="var(--mascot-stroke)" />
        </g>

        <Limb cls="s-arm s-arm-n" childCls="s-fore s-fore-n" {...arm} />
      </g>
    </svg>
  );
}
