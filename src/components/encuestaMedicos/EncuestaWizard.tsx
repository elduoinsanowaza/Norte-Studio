"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { getVisibleQuestions, QUESTIONS, type Question } from "@/lib/encuestaMedicos";
import IntroScreen from "./IntroScreen";
import QuestionScreen from "./QuestionScreen";
import ClosingScreen from "./ClosingScreen";
import PulseBackground from "./PulseBackground";
import SurveyMascot from "./SurveyMascot";

type Stage = "intro" | "question" | "closing";

export default function EncuestaWizard() {
  const [stage, setStage] = useState<Stage>("intro");
  const [answers, setAnswers] = useState<Record<string, unknown>>({});
  const [currentId, setCurrentId] = useState<string>(QUESTIONS[0].id);
  const [submitStatus, setSubmitStatus] = useState<"saving" | "ready" | "error">("saving");
  const [folio, setFolio] = useState("");
  const [mascotBump, setMascotBump] = useState(0);
  const [railEl, setRailEl] = useState<HTMLDivElement | null>(null);
  const advanceTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const visible = useMemo(() => getVisibleQuestions(answers), [answers]);
  const rawIndex = visible.findIndex((q) => q.id === currentId);
  const currentIndex = rawIndex === -1 ? 0 : rawIndex;
  const currentQuestion = visible[currentIndex];
  // The optional extra space sits last and doesn't count as a question.
  const numberedTotal = visible.filter((q) => q.type !== "extras").length;
  const progress =
    currentQuestion?.type === "extras" ? 1 : (currentIndex + 1) / numberedTotal;

  useEffect(() => {
    return () => {
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
    };
  }, []);

  function setAnswer(id: string, value: unknown) {
    setAnswers((prev) => ({ ...prev, [id]: value }));
  }

  // Used for auto-advancing question types (single choice, scale): the
  // answer and the navigation both have to resolve off the SAME snapshot,
  // because setAnswers is async — reading the `visible` list computed at
  // click time would still reflect the answer that was true a moment ago,
  // which silently breaks the Q5→Q6 and Q7→Q8 skip logic.
  function selectAndAdvance(id: string, value: unknown) {
    setAnswers((prev) => {
      const next = { ...prev, [id]: value };
      if (advanceTimer.current) clearTimeout(advanceTimer.current);
      advanceTimer.current = setTimeout(() => advanceFrom(id, next), 380);
      return next;
    });
  }

  function advanceFrom(id: string, snapshot: Record<string, unknown>) {
    const freshVisible = getVisibleQuestions(snapshot);
    const idx = freshVisible.findIndex((q) => q.id === id);
    if (idx === -1 || idx === freshVisible.length - 1) {
      submitSurvey(snapshot);
      return;
    }
    setCurrentId(freshVisible[idx + 1].id);
    setMascotBump((n) => n + 1);
  }

  function goNext() {
    const idx = visible.findIndex((q) => q.id === currentId);
    if (idx === -1 || idx === visible.length - 1) {
      submitSurvey(answers);
      return;
    }
    setCurrentId(visible[idx + 1].id);
    setMascotBump((n) => n + 1);
  }

  function goBack() {
    const idx = visible.findIndex((q) => q.id === currentId);
    if (idx <= 0) {
      setStage("intro");
      return;
    }
    setCurrentId(visible[idx - 1].id);
  }

  async function submitSurvey(snapshot: Record<string, unknown> = answers) {
    setStage("closing");
    setSubmitStatus("saving");
    try {
      const res = await fetch("/api/encuesta-medicos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          answers: snapshot,
          contactName: snapshot.q26_name,
          contactInfo: snapshot.q26_info,
          comments: snapshot.q27,
        }),
      });
      const data = await res.json();
      if (!res.ok || !data.ok) throw new Error("save failed");
      setFolio(data.folio as string);
      setSubmitStatus("ready");
    } catch {
      setSubmitStatus("error");
    }
  }

  return (
    <div className="em-root flex min-h-dvh flex-col items-center justify-center px-5 py-10 sm:px-8">
      <PulseBackground />
      <div className="relative z-10 w-full max-w-xl">
        {stage === "intro" && <IntroScreen onStart={() => setStage("question")} />}

        {stage === "question" && currentQuestion && (
          // pt-10 leaves headroom for the mascot standing on the progress bar.
          <div className="relative pt-10">
            <ProgressBar value={progress} />
            <SurveyMascot
              rail={railEl}
              rowCount={mascotRows(currentQuestion)}
              bump={mascotBump}
            />
            <QuestionScreen
              question={currentQuestion}
              answers={answers}
              setAnswer={setAnswer}
              onSelectAndAdvance={selectAndAdvance}
              onNext={goNext}
              onBack={goBack}
              canGoBack
              stepKey={currentQuestion.id}
              index={currentIndex}
              total={numberedTotal}
              railRef={setRailEl}
            />
          </div>
        )}

        {stage === "closing" && (
          <ClosingScreen status={submitStatus} folio={folio} onRetry={() => submitSurvey(answers)} />
        )}
      </div>
    </div>
  );
}

// Card-based questions give the mascot one step per card; the rest (scale,
// price, contact, free text) have nothing to walk along, so it idles on top.
function mascotRows(q: Question) {
  if (q.type === "single" || q.type === "multi") return q.options.length;
  if (q.type === "ranking") return q.items.length;
  return 1;
}

function ProgressBar({ value }: { value: number }) {
  return (
    <div className="em-progress-track em-r-pill mb-8 h-1.5 w-full">
      <div
        className="em-progress-fill h-full"
        style={{ width: `${Math.min(100, Math.max(4, value * 100))}%` }}
      />
    </div>
  );
}
