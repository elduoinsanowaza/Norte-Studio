"use client";

import type { Question } from "@/lib/encuestaMedicos";

type Answers = Record<string, unknown>;

export default function QuestionScreen({
  question,
  answers,
  setAnswer,
  onSelectAndAdvance,
  onNext,
  onBack,
  canGoBack,
  stepKey,
  index,
  total,
  railRef,
}: {
  question: Question;
  answers: Answers;
  setAnswer: (id: string, value: unknown) => void;
  onSelectAndAdvance: (id: string, value: unknown) => void;
  onNext: () => void;
  onBack: () => void;
  canGoBack: boolean;
  stepKey: string;
  index: number;
  total: number;
  railRef: (el: HTMLDivElement | null) => void;
}) {
  return (
    <div key={stepKey} className="em-step-enter flex w-full flex-col">
      <div className="mb-8 flex items-center justify-between">
        {canGoBack ? (
          <button
            type="button"
            onClick={onBack}
            className="text-sm font-medium text-[var(--em-ink-soft)] transition hover:text-[var(--em-ink)]"
          >
            ← Atrás
          </button>
        ) : (
          <span />
        )}
        <span className="text-xs font-semibold tracking-wide text-[var(--em-ink-soft)]">
          {question.type === "extras" ? "Opcional" : `${index + 1} / ${total}`}
        </span>
      </div>

      {question.contextBox ? (
        <div className="em-r-lg mb-6 bg-[var(--em-teal-pale)] p-4 text-sm leading-relaxed text-[var(--em-ink)] sm:p-5">
          {question.contextBox}
        </div>
      ) : null}

      <h2 className="text-2xl font-semibold leading-snug text-[var(--em-ink)] sm:text-3xl">
        {question.prompt}
      </h2>
      {question.help ? (
        <p className="mt-2 text-sm font-medium text-[var(--em-teal-dark)]">{question.help}</p>
      ) : null}

      {/* Narrow screens carve a left lane for the mascot; from md up it
          walks in the page margins instead (WIDE_QUERY in SurveyMascot). */}
      <div ref={railRef} className="mt-8 pl-12 md:pl-0">
        {question.type === "single" && (
          <SingleField
            question={question}
            value={answers[question.id] as string | undefined}
            otherValue={(answers[`${question.id}_other`] as string) ?? ""}
            onSelect={(v) => {
              const opt = question.options.find((o) => o.value === v);
              if (opt?.other) {
                setAnswer(question.id, v);
              } else {
                onSelectAndAdvance(question.id, v);
              }
            }}
            onOtherChange={(text) => setAnswer(`${question.id}_other`, text)}
          />
        )}

        {question.type === "multi" && (
          <MultiField
            question={question}
            value={(answers[question.id] as string[] | undefined) ?? []}
            otherValue={(answers[`${question.id}_other`] as string) ?? ""}
            onChange={(next) => setAnswer(question.id, next)}
            onOtherChange={(text) => setAnswer(`${question.id}_other`, text)}
          />
        )}

        {question.type === "scale" && (
          <ScaleField
            question={question}
            value={answers[question.id] as number | undefined}
            onSelect={(v) => onSelectAndAdvance(question.id, v)}
          />
        )}

        {question.type === "number" && (
          <NumberField
            question={question}
            value={answers[question.id] as number | null | undefined}
            onChange={(v) => setAnswer(question.id, v)}
          />
        )}

        {question.type === "ranking" && (
          <RankingField
            question={question}
            value={(answers[question.id] as string[] | undefined) ?? []}
            onChange={(next) => setAnswer(question.id, next)}
          />
        )}

        {question.type === "extras" && (
          <ExtrasField
            question={question}
            name={(answers.q26_name as string) ?? ""}
            info={(answers.q26_info as string) ?? ""}
            comments={(answers.q27 as string) ?? ""}
            onName={(v) => setAnswer("q26_name", v)}
            onInfo={(v) => setAnswer("q26_info", v)}
            onComments={(v) => setAnswer("q27", v)}
          />
        )}
      </div>

      <NextControls question={question} answers={answers} onNext={onNext} />
    </div>
  );
}

function NextControls({
  question,
  answers,
  onNext,
}: {
  question: Question;
  answers: Answers;
  onNext: () => void;
}) {
  if (question.type === "single" || question.type === "scale") {
    const value = answers[question.id];
    const opt =
      question.type === "single"
        ? question.options.find((o) => o.value === value)
        : undefined;
    const needsOther = opt?.other && !(answers[`${question.id}_other`] as string)?.trim();
    if (value === undefined || needsOther) return null;
    if (!opt?.other) return null; // already auto-advances
    return (
      <button type="button" onClick={onNext} className="em-btn-primary em-r-pill mt-8 self-start px-8 py-3.5 text-sm font-semibold">
        Continuar →
      </button>
    );
  }

  if (question.type === "multi") {
    const value = (answers[question.id] as string[] | undefined) ?? [];
    const hasOther = question.options.some((o) => o.other && value.includes(o.value));
    const otherOk = !hasOther || (answers[`${question.id}_other`] as string)?.trim();
    const disabled = value.length === 0 || !otherOk;
    return (
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="em-btn-primary em-r-pill mt-8 self-start px-8 py-3.5 text-sm font-semibold"
      >
        Continuar →
      </button>
    );
  }

  if (question.type === "number") {
    return (
      <div className="mt-8 flex items-center gap-5">
        <button type="button" onClick={onNext} className="em-btn-primary em-r-pill px-8 py-3.5 text-sm font-semibold">
          Continuar →
        </button>
        {question.skippable ? (
          <button
            type="button"
            onClick={onNext}
            className="text-sm font-medium text-[var(--em-ink-soft)] underline decoration-dotted underline-offset-4 hover:text-[var(--em-ink)]"
          >
            Prefiero no responder
          </button>
        ) : null}
      </div>
    );
  }

  if (question.type === "ranking") {
    const value = (answers[question.id] as string[] | undefined) ?? [];
    const disabled = value.length < question.items.length;
    return (
      <button
        type="button"
        onClick={onNext}
        disabled={disabled}
        className="em-btn-primary em-r-pill mt-8 self-start px-8 py-3.5 text-sm font-semibold"
      >
        Continuar →
      </button>
    );
  }

  // The extra space is optional: it can always be submitted empty.
  return (
    <button type="button" onClick={onNext} className="em-btn-primary em-r-pill mt-8 self-start px-8 py-3.5 text-sm font-semibold">
      Terminar encuesta →
    </button>
  );
}

function OptionButton({
  label,
  selected,
  onClick,
}: {
  label: string;
  selected: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`em-option em-r-lg flex w-full items-center justify-between gap-3 border px-5 py-4 text-left text-[15px] font-medium sm:text-base ${
        selected
          ? "border-[var(--em-teal)] bg-[var(--em-teal-pale)] text-[var(--em-ink)]"
          : "border-[var(--em-border)] bg-[var(--em-card)] text-[var(--em-ink)]"
      }`}
    >
      <span>{label}</span>
      <span
        className={`em-r-pill flex h-5 w-5 shrink-0 items-center justify-center border-2 ${
          selected ? "border-[var(--em-teal)] bg-[var(--em-teal)]" : "border-[var(--em-border)]"
        }`}
      >
        {selected ? (
          <svg viewBox="0 0 12 12" className="h-3 w-3 text-white" fill="none">
            <path d="M2 6.2 4.8 9 10 3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : null}
      </span>
    </button>
  );
}

function SingleField({
  question,
  value,
  otherValue,
  onSelect,
  onOtherChange,
}: {
  question: Extract<Question, { type: "single" }>;
  value: string | undefined;
  otherValue: string;
  onSelect: (v: string) => void;
  onOtherChange: (v: string) => void;
}) {
  const selectedOpt = question.options.find((o) => o.value === value);
  return (
    <div className="flex flex-col gap-3">
      {question.options.map((opt) => (
        <OptionButton
          key={opt.value}
          label={opt.label}
          selected={value === opt.value}
          onClick={() => onSelect(opt.value)}
        />
      ))}
      {selectedOpt?.other ? (
        <input
          autoFocus
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Escribe aquí…"
          className="em-r-lg border border-[var(--em-border)] bg-[var(--em-card)] px-5 py-3.5 text-base outline-none focus:border-[var(--em-teal)]"
        />
      ) : null}
    </div>
  );
}

function MultiField({
  question,
  value,
  otherValue,
  onChange,
  onOtherChange,
}: {
  question: Extract<Question, { type: "multi" }>;
  value: string[];
  otherValue: string;
  onChange: (v: string[]) => void;
  onOtherChange: (v: string) => void;
}) {
  const max = question.max;
  const hasOther = value.some((v) => question.options.find((o) => o.value === v)?.other);

  function toggle(v: string) {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
      return;
    }
    if (max && value.length >= max) return;
    onChange([...value, v]);
  }

  return (
    <div className="flex flex-col gap-3">
      {question.options.map((opt) => {
        const selected = value.includes(opt.value);
        const atMax = !!max && value.length >= max && !selected;
        return (
          <div key={opt.value} className={atMax ? "opacity-40" : ""}>
            <OptionButton label={opt.label} selected={selected} onClick={() => toggle(opt.value)} />
          </div>
        );
      })}
      {hasOther ? (
        <input
          autoFocus
          value={otherValue}
          onChange={(e) => onOtherChange(e.target.value)}
          placeholder="Escribe aquí…"
          className="em-r-lg border border-[var(--em-border)] bg-[var(--em-card)] px-5 py-3.5 text-base outline-none focus:border-[var(--em-teal)]"
        />
      ) : null}
    </div>
  );
}

function ScaleField({
  question,
  value,
  onSelect,
}: {
  question: Extract<Question, { type: "scale" }>;
  value: number | undefined;
  onSelect: (v: number) => void;
}) {
  return (
    <div>
      <div className="flex justify-center gap-3 sm:gap-4">
        {[1, 2, 3, 4, 5].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onSelect(n)}
            className={`em-option em-r-pill flex h-14 w-14 items-center justify-center border-2 text-lg font-semibold sm:h-16 sm:w-16 ${
              value === n
                ? "border-[var(--em-teal)] bg-[var(--em-teal)] text-white"
                : "border-[var(--em-border)] bg-[var(--em-card)] text-[var(--em-ink)]"
            }`}
          >
            {n}
          </button>
        ))}
      </div>
      <div className="mt-3 flex justify-between text-xs font-medium text-[var(--em-ink-soft)]">
        <span>{question.minLabel}</span>
        <span>{question.maxLabel}</span>
      </div>
    </div>
  );
}

function NumberField({
  question,
  value,
  onChange,
}: {
  question: Extract<Question, { type: "number" }>;
  value: number | null | undefined;
  onChange: (v: number | null) => void;
}) {
  return (
    <div className="em-r-xl flex items-center gap-2 border border-[var(--em-border)] bg-[var(--em-card)] px-6 py-5">
      <span className="text-2xl font-semibold text-[var(--em-teal-dark)]">$</span>
      <input
        autoFocus
        type="text"
        inputMode="decimal"
        value={value ?? ""}
        onChange={(e) => {
          const raw = e.target.value.replace(/[^\d]/g, "");
          onChange(raw === "" ? null : Number(raw));
        }}
        placeholder="0"
        className="w-full bg-transparent text-3xl font-semibold text-[var(--em-ink)] outline-none"
      />
      {question.unit ? (
        <span className="whitespace-nowrap text-sm font-medium text-[var(--em-ink-soft)]">
          {question.unit}
        </span>
      ) : null}
    </div>
  );
}

function RankingField({
  question,
  value,
  onChange,
}: {
  question: Extract<Question, { type: "ranking" }>;
  value: string[];
  onChange: (v: string[]) => void;
}) {
  function tap(v: string) {
    if (value.includes(v)) {
      onChange(value.filter((x) => x !== v));
      return;
    }
    onChange([...value, v]);
  }

  return (
    <div className="flex flex-col gap-3">
      {question.items.map((item) => {
        const rank = value.indexOf(item.value);
        const selected = rank !== -1;
        return (
          <button
            key={item.value}
            type="button"
            onClick={() => tap(item.value)}
            className={`em-option em-r-lg flex w-full items-center gap-4 border px-5 py-4 text-left text-[15px] font-medium sm:text-base ${
              selected
                ? "border-[var(--em-teal)] bg-[var(--em-teal-pale)]"
                : "border-[var(--em-border)] bg-[var(--em-card)]"
            }`}
          >
            <span
              className={`em-rank-badge em-r-pill flex h-8 w-8 shrink-0 items-center justify-center text-sm font-bold ${
                selected ? "scale-100 bg-[var(--em-teal)] text-white" : "scale-90 bg-[var(--em-teal-pale)] text-[var(--em-teal-dark)]"
              }`}
            >
              {selected ? rank + 1 : ""}
            </span>
            <span>{item.label}</span>
          </button>
        );
      })}
      {value.length > 0 ? (
        <button
          type="button"
          onClick={() => onChange([])}
          className="self-start text-xs font-medium text-[var(--em-ink-soft)] underline decoration-dotted underline-offset-4 hover:text-[var(--em-ink)]"
        >
          Reiniciar orden
        </button>
      ) : null}
    </div>
  );
}

function ExtrasField({
  question,
  name,
  info,
  comments,
  onName,
  onInfo,
  onComments,
}: {
  question: Extract<Question, { type: "extras" }>;
  name: string;
  info: string;
  comments: string;
  onName: (v: string) => void;
  onInfo: (v: string) => void;
  onComments: (v: string) => void;
}) {
  const field =
    "em-r-lg w-full border border-[var(--em-border)] bg-[var(--em-card)] px-5 py-3.5 text-base outline-none focus:border-[var(--em-teal)]";
  return (
    <div className="flex flex-col gap-8">
      <div className="flex flex-col gap-3">
        <p className="text-base font-semibold leading-snug text-[var(--em-ink)]">
          {question.contactPrompt}
        </p>
        <input
          value={name}
          onChange={(e) => onName(e.target.value)}
          placeholder="Nombre"
          className={field}
        />
        <input
          value={info}
          onChange={(e) => onInfo(e.target.value)}
          placeholder="WhatsApp o correo"
          className={field}
        />
      </div>
      <div className="flex flex-col gap-3">
        <p className="text-base font-semibold leading-snug text-[var(--em-ink)]">
          {question.commentsPrompt}
        </p>
        <textarea
          value={comments}
          onChange={(e) => onComments(e.target.value)}
          rows={4}
          placeholder="Escribe aquí…"
          className={`${field} resize-none`}
        />
      </div>
    </div>
  );
}
