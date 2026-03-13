import { useState } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, CheckCircle, XCircle, ChevronRight, Trophy, Star } from "lucide-react";

const questions = [
  {
    id: 1,
    question: "What does CPU stand for?",
    options: ["Central Processing Unit", "Computer Power Unit", "Central Power Utility", "Computing Process Updater"],
    correct: 0,
  },
  {
    id: 2,
    question: "Which of the following is NOT a web browser?",
    options: ["Google Chrome", "Mozilla Firefox", "Microsoft Word", "Safari"],
    correct: 2,
  },
  {
    id: 3,
    question: "What does 'www' stand for in a website address?",
    options: ["World Wide Web", "Wide Wireless Web", "Web Without Wires", "World Web Works"],
    correct: 0,
  },
  {
    id: 4,
    question: "Which key combination is used to copy selected text?",
    options: ["Ctrl + V", "Ctrl + X", "Ctrl + C", "Ctrl + Z"],
    correct: 2,
  },
  {
    id: 5,
    question: "What is the main purpose of an operating system?",
    options: ["To browse the internet", "To manage hardware and software resources", "To create documents", "To play music and videos"],
    correct: 1,
  },
];

export function Quiz() {
  const navigate = useNavigate();
  const [currentQ, setCurrentQ]         = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [submitted, setSubmitted]        = useState(false);
  const [score, setScore]                = useState(0);
  const [answers, setAnswers]            = useState<(number | null)[]>(Array(questions.length).fill(null));
  const [showResult, setShowResult]      = useState(false);

  const question    = questions[currentQ];
  const isCorrect   = submitted && selectedOption === question.correct;
  const progressPct = ((currentQ + (submitted ? 1 : 0)) / questions.length) * 100;

  function handleSubmit() {
    if (selectedOption === null) return;
    setSubmitted(true);
    const newAnswers = [...answers];
    newAnswers[currentQ] = selectedOption;
    setAnswers(newAnswers);
    if (selectedOption === question.correct) setScore((s) => s + 10);
  }

  function handleNext() {
    if (currentQ < questions.length - 1) {
      setCurrentQ((q) => q + 1);
      setSelectedOption(null);
      setSubmitted(false);
    } else {
      setShowResult(true);
    }
  }

  // ── Results Screen ──────────────────────────────────────
  if (showResult) {
    const percentage = Math.round((score / (questions.length * 10)) * 100);
    const passed     = percentage >= 60;
    return (
      <div className="min-h-screen flex items-center justify-center px-6 py-12" style={{ backgroundColor: "#f0f9ff" }}>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.4 }}
          className="w-full text-center"
          style={{ maxWidth: "520px" }}
        >
          <div
            className="p-10 rounded-3xl"
            style={{ backgroundColor: "white", boxShadow: "0 8px 40px rgba(79,70,229,0.12)", border: "1px solid #e0e7ff" }}
          >
            <div
              className="flex items-center justify-center w-24 h-24 rounded-full mx-auto mb-6"
              style={{
                backgroundColor: "#eef2ff",
                border: "3px solid #c7d2fe",
              }}
            >
              <Trophy size={44} color="#4f46e5" />
            </div>

            <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "2rem", fontWeight: 900, color: "#1e1b4b", marginBottom: "8px" }}>
              {passed ? "Excellent Work! 🎉" : "Keep Practicing! 💪"}
            </h2>
            <p style={{ fontSize: "1rem", color: "#475569", marginBottom: "32px" }}>
              {passed
                ? "You've passed this chapter quiz with flying colors."
                : "You're making progress. Review the lesson and try again."}
            </p>

            {/* Score grid */}
            <div className="flex items-center justify-center gap-8 p-6 rounded-2xl mb-8" style={{ backgroundColor: "#eef2ff" }}>
              <div>
                <p style={{ fontSize: "3rem", fontWeight: 900, color: "#4f46e5", lineHeight: 1 }}>{score}</p>
                <p style={{ fontSize: "0.875rem", color: "#94a3b8", marginTop: "4px" }}>Points Earned</p>
              </div>
              <div style={{ width: "1px", height: "50px", backgroundColor: "#e0e7ff" }} />
              <div>
                <p style={{ fontSize: "3rem", fontWeight: 900, color: "#1e1b4b", lineHeight: 1 }}>{percentage}%</p>
                <p style={{ fontSize: "0.875rem", color: "#94a3b8", marginTop: "4px" }}>Score</p>
              </div>
              <div style={{ width: "1px", height: "50px", backgroundColor: "#e0e7ff" }} />
              <div>
                <p style={{ fontSize: "3rem", fontWeight: 900, color: "#4f46e5", lineHeight: 1 }}>
                  {answers.filter((a, i) => a === questions[i].correct).length}/{questions.length}
                </p>
                <p style={{ fontSize: "0.875rem", color: "#94a3b8", marginTop: "4px" }}>Correct</p>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {[1, 2, 3].map((star) => (
                <Star
                  key={star}
                  size={28}
                  fill={percentage >= star * 33 ? "#4f46e5" : "none"}
                  style={{ color: percentage >= star * 33 ? "#4f46e5" : "#e2e8f0" }}
                />
              ))}
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => navigate("/lesson")}
                style={{ flex: 1, padding: "12px", borderRadius: "12px", backgroundColor: "white", border: "2px solid #e0e7ff", color: "#475569", fontWeight: 600, cursor: "pointer", fontSize: "0.9rem", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f5f3ff")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
              >
                ← Back to Lesson
              </button>
              <button
                onClick={() => navigate("/student-dashboard")}
                style={{ flex: 1, padding: "12px", borderRadius: "12px", backgroundColor: "#4f46e5", color: "white", fontWeight: 700, border: "none", cursor: "pointer", fontSize: "0.9rem", boxShadow: "0 4px 16px rgba(79,70,229,0.3)", transition: "background 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
              >
                Dashboard →
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    );
  }

  // ── Question Screen ────────────────────────────────────
  return (
    <div className="min-h-screen px-6 py-8" style={{ backgroundColor: "#f0f9ff" }}>
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate("/lesson")}
          className="flex items-center gap-2 mb-8"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontWeight: 500, fontSize: "0.9375rem", padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4f46e5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
        >
          <ArrowLeft size={18} /> Back to Lesson
        </button>

        {/* Header */}
        <motion.div key={currentQ} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span
                style={{
                  fontSize: "0.8rem", fontWeight: 700, color: "#4f46e5",
                  backgroundColor: "#eef2ff", padding: "4px 10px", borderRadius: "999px",
                }}
              >
                QUIZ
              </span>
              <span style={{ fontSize: "0.875rem", color: "#64748b", fontWeight: 500 }}>
                Basic Computer Skills · Ch.1
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Trophy size={14} color="#4f46e5" />
              <span style={{ fontSize: "0.875rem", fontWeight: 700, color: "#1e1b4b" }}>{score} pts</span>
            </div>
          </div>

          {/* Progress bar */}
          <div className="flex items-center gap-3 mb-2">
            <span style={{ fontSize: "0.875rem", fontWeight: 600, color: "#64748b", whiteSpace: "nowrap" }}>
              Question {currentQ + 1} of {questions.length}
            </span>
            <div className="flex-1 rounded-full" style={{ height: "8px", backgroundColor: "#e0e7ff" }}>
              <motion.div
                animate={{ width: `${progressPct}%` }}
                transition={{ duration: 0.4 }}
                className="h-full rounded-full"
                style={{ backgroundColor: "#4f46e5" }}
              />
            </div>
          </div>

          {/* Question dots */}
          <div className="flex items-center gap-2 mt-2 mb-8">
            {questions.map((_, i) => (
              <div
                key={i}
                style={{
                  width: i === currentQ ? "24px" : "8px",
                  height: "8px", borderRadius: "999px",
                  backgroundColor:
                    i < currentQ
                      ? answers[i] === questions[i].correct ? "#4f46e5" : "#ef4444"
                      : i === currentQ ? "#4f46e5" : "#e0e7ff",
                  transition: "all 0.3s",
                }}
              />
            ))}
          </div>
        </motion.div>

        {/* Question Card + Options */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQ}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.3 }}
          >
            <div
              className="p-8 rounded-2xl mb-8"
              style={{ backgroundColor: "white", boxShadow: "0 4px 24px rgba(79,70,229,0.08)", border: "1px solid #e0e7ff" }}
            >
              <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#4f46e5", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "12px" }}>
                Question {currentQ + 1}
              </p>
              <h2 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.5rem", fontWeight: 800, color: "#1e1b4b", lineHeight: 1.35 }}>
                {question.question}
              </h2>
            </div>

            {/* Options */}
            <div className="flex flex-col gap-3 mb-8">
              {question.options.map((option, idx) => {
                const isSelected       = selectedOption === idx;
                const isCorrectOption  = submitted && idx === question.correct;
                const isWrongOption    = submitted && isSelected && idx !== question.correct;

                let borderColor = "#e0e7ff";
                let bgColor     = "white";
                let textColor   = "#374151";

                if (!submitted) {
                  if (isSelected) { borderColor = "#4f46e5"; bgColor = "#eef2ff"; textColor = "#3730a3"; }
                } else {
                  if (isCorrectOption)      { borderColor = "#2563eb"; bgColor = "#e0f2fe"; textColor = "#1d4ed8"; }
                  else if (isWrongOption)   { borderColor = "#94a3b8"; bgColor = "#f1f5f9"; textColor = "#64748b"; }
                  else                      { borderColor = "#e5e7eb"; bgColor = "#f9fafb"; textColor = "#94a3b8"; }
                }

                return (
                  <button
                    key={idx}
                    onClick={() => !submitted && setSelectedOption(idx)}
                    disabled={submitted}
                    className="flex items-center gap-4 p-4 rounded-xl text-left"
                    style={{
                      backgroundColor: bgColor, border: `2px solid ${borderColor}`, color: textColor,
                      cursor: submitted ? "default" : "pointer",
                      transform: !submitted && isSelected ? "translateY(-1px)" : "none",
                      boxShadow: !submitted && isSelected ? "0 4px 12px rgba(79,70,229,0.15)" : "none",
                      transition: "all 0.1s",
                    }}
                  >
                    <div
                      className="flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0"
                      style={{
                        backgroundColor: submitted
                          ? isCorrectOption ? "#2563eb" : isWrongOption ? "#94a3b8" : "#f1f5f9"
                          : isSelected ? "#4f46e5" : "#f1f5f9",
                        color: (submitted && (isCorrectOption || isWrongOption)) || (!submitted && isSelected) ? "white" : "#94a3b8",
                      }}
                    >
                    {submitted && isCorrectOption ? <CheckCircle size={16} /> :
                     submitted && isWrongOption   ? <XCircle     size={16} /> :
                       <span style={{ fontSize: "0.8125rem", fontWeight: 700 }}>{String.fromCharCode(65 + idx)}</span>}
                    </div>
                    <span style={{ fontSize: "1rem", fontWeight: isSelected || isCorrectOption ? 600 : 400 }}>
                      {option}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Feedback */}
            <AnimatePresence>
              {submitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-6 p-4 rounded-xl flex items-center gap-3"
                  style={{
                    backgroundColor: "#e0f2fe",
                    border: "1px solid #bfdbfe",
                  }}
                >
                  {isCorrect
                    ? <CheckCircle size={20} color="#2563eb" style={{ flexShrink: 0 }} />
                    : <XCircle     size={20} color="#1f2933" style={{ flexShrink: 0 }} />}
                  <div>
                    <p style={{ fontWeight: 700, color: isCorrect ? "#1d4ed8" : "#111827", fontSize: "0.9375rem" }}>
                      {isCorrect ? "Great job! +10 points" : "Not quite right!"}
                    </p>
                    {!isCorrect && (
                      <p style={{ fontSize: "0.8125rem", color: "#1d4ed8", marginTop: "2px" }}>
                        Correct answer: {question.options[question.correct]}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Submit / Next */}
            <button
              onClick={submitted ? handleNext : handleSubmit}
              disabled={!submitted && selectedOption === null}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-xl"
              style={{
                backgroundColor: !submitted && selectedOption === null ? "#e0e7ff" : "#4f46e5",
                color: !submitted && selectedOption === null ? "#94a3b8" : "white",
                fontWeight: 700, fontSize: "1rem",
                border: "none",
                cursor: !submitted && selectedOption === null ? "not-allowed" : "pointer",
                boxShadow: !submitted && selectedOption === null ? "none" : "0 4px 16px rgba(79,70,229,0.3)",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (submitted || selectedOption !== null) e.currentTarget.style.backgroundColor = "#4338ca"; }}
              onMouseLeave={(e) => { if (submitted || selectedOption !== null) e.currentTarget.style.backgroundColor = "#4f46e5"; }}
            >
              {submitted
                ? currentQ < questions.length - 1
                  ? <> Next Question <ChevronRight size={18} /> </>
                  : <> View Results <Trophy size={18} /> </>
                : "Submit Answer"}
            </button>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
