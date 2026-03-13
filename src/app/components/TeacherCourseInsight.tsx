import { useNavigate } from "react-router";
import { ArrowLeft, Users, Download, TrendingUp, BookOpen, CheckCircle, Clock } from "lucide-react";

// Mock course insight data
// TODO: fetch from /api/teacher/course/:id/insights
const MOCK_COURSE = {
  title: "Algebra Basics – Chapter 4",
  subject: "Mathematics",
  totalEnrolled: 43,
  completionRate: 72,
  avgScore: 81,
  totalDownloads: 38,
  chapters: [
    { id: 1, title: "Introduction to Variables", completions: 43, avgScore: 88 },
    { id: 2, title: "Simple Equations",          completions: 41, avgScore: 84 },
    { id: 3, title: "Linear Expressions",         completions: 35, avgScore: 79 },
    { id: 4, title: "Word Problems",              completions: 28, avgScore: 72 },
  ],
  students: [
    { name: "Aarav Sharma",   progress: 100, score: 90, lastActive: "Today" },
    { name: "Priya Singh",    progress: 85,  score: 82, lastActive: "Yesterday" },
    { name: "Ravi Kumar",     progress: 75,  score: 78, lastActive: "2 days ago" },
    { name: "Ananya Mehta",   progress: 60,  score: 74, lastActive: "3 days ago" },
    { name: "Kiran Yadav",    progress: 40,  score: 65, lastActive: "5 days ago" },
  ],
};

const STAT_ACCENT = [
  { bg: "#eef2ff", icon: <Users size={18} color="#1d4ed8" />, value: MOCK_COURSE.totalEnrolled, label: "Students Enrolled" },
  { bg: "#e0f2fe", icon: <Download size={18} color="#2563eb" />, value: MOCK_COURSE.totalDownloads, label: "Offline Downloads" },
  { bg: "#dbeafe", icon: <TrendingUp size={18} color="#1e40af" />, value: `${MOCK_COURSE.completionRate}%`, label: "Completion Rate" },
  { bg: "#eef2ff", icon: <CheckCircle size={18} color="#4f46e5" />, value: `${MOCK_COURSE.avgScore}%`, label: "Avg. Quiz Score" },
];

export function TeacherCourseInsight() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#f0f9ff" }}>
      <div className="max-w-4xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate("/teacher-dashboard")}
          className="flex items-center gap-2 mb-6"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontWeight: 500, fontSize: "0.9rem", padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4f46e5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Course Header */}
        <div className="flex items-start justify-between gap-4 mb-7">
          <div>
            <span
              className="inline-block px-2 py-0.5 rounded text-xs font-semibold mb-2"
              style={{ backgroundColor: "#eef2ff", color: "#4f46e5" }}
            >
              {MOCK_COURSE.subject}
            </span>
            <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#1e1b4b", margin: 0 }}>
              {MOCK_COURSE.title}
            </h1>
            <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "4px" }}>
              Course Insights — data as of today
            </p>
          </div>
        </div>

        {/* ── Stats ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-7">
          {STAT_ACCENT.map((s) => (
            <div
              key={s.label}
              className="flex flex-col gap-3 p-5 rounded-xl"
              style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
            >
              <div
                className="flex items-center justify-center w-10 h-10 rounded-lg"
                style={{ backgroundColor: s.bg }}
              >
                {s.icon}
              </div>
              <div>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e1b4b", lineHeight: 1, fontFamily: "'Poppins', sans-serif" }}>
                  {s.value}
                </p>
                <p style={{ fontSize: "0.775rem", color: "#94a3b8", marginTop: "3px" }}>{s.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ── Completion Bar ── */}
        <div
          className="p-5 rounded-xl mb-7"
          style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
        >
          <div className="flex justify-between items-center mb-2">
            <span style={{ fontWeight: 600, color: "#1e1b4b", fontSize: "0.9rem" }}>Overall Completion</span>
            <span style={{ fontWeight: 700, color: "#4f46e5" }}>{MOCK_COURSE.completionRate}%</span>
          </div>
          <div className="w-full rounded-full" style={{ height: "8px", backgroundColor: "#e0e7ff" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${MOCK_COURSE.completionRate}%`, backgroundColor: "#4f46e5" }}
            />
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-7">
          {/* ── Chapter Breakdown ── */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
          >
            <div className="px-5 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
              <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "0.9rem" }}>
                Chapter Completion
              </h2>
            </div>
            {MOCK_COURSE.chapters.map((ch, i) => (
              <div
                key={ch.id}
                className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: i < MOCK_COURSE.chapters.length - 1 ? "1px solid #f8fafc" : "none" }}
              >
                <div className="flex items-center gap-3 min-w-0">
                  <div
                    className="flex items-center justify-center w-7 h-7 rounded-full shrink-0 text-xs font-bold"
                    style={{ backgroundColor: "#eef2ff", color: "#4f46e5" }}
                  >
                    {ch.id}
                  </div>
                  <p className="truncate" style={{ color: "#374151", fontSize: "0.85rem", fontWeight: 500 }}>
                    {ch.title}
                  </p>
                </div>
                <div className="flex items-center gap-3 shrink-0 ml-3">
                  <div style={{ width: "60px" }}>
                    <div className="w-full rounded-full" style={{ height: "5px", backgroundColor: "#e0e7ff" }}>
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${Math.round((ch.completions / MOCK_COURSE.totalEnrolled) * 100)}%`, backgroundColor: "#4f46e5" }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: "0.775rem", fontWeight: 600, color: "#4f46e5", minWidth: "28px", textAlign: "right" }}>
                    {ch.completions}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* ── Avg Scores per Chapter ── */}
          <div
            className="rounded-xl overflow-hidden"
            style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
          >
            <div className="px-5 py-4 border-b" style={{ borderColor: "#f1f5f9" }}>
              <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "0.9rem" }}>
                Avg. Quiz Score by Chapter
              </h2>
            </div>
            {MOCK_COURSE.chapters.map((ch, i) => (
              <div
                key={ch.id}
                className="flex items-center justify-between px-5 py-3.5"
                style={{ borderBottom: i < MOCK_COURSE.chapters.length - 1 ? "1px solid #f8fafc" : "none" }}
              >
                <p className="truncate" style={{ color: "#374151", fontSize: "0.85rem", fontWeight: 500, flex: 1 }}>
                  Ch.{ch.id} — {ch.title}
                </p>
                <div className="flex items-center gap-2 ml-3 shrink-0">
                  <div style={{ width: "64px" }}>
                    <div className="w-full rounded-full" style={{ height: "5px", backgroundColor: "#e0e7ff" }}>
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${ch.avgScore}%`,
                          backgroundColor: ch.avgScore >= 80 ? "#10b981" : ch.avgScore >= 60 ? "#f59e0b" : "#ef4444",
                        }}
                      />
                    </div>
                  </div>
                  <span style={{ fontSize: "0.775rem", fontWeight: 700, color: "#475569", minWidth: "32px" }}>
                    {ch.avgScore}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Student Progress Table ── */}
        <div
          className="rounded-xl overflow-hidden"
          style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
        >
          <div className="px-5 py-4 border-b flex items-center justify-between" style={{ borderColor: "#f1f5f9" }}>
            <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "0.9rem" }}>
              Student Progress
            </h2>
            <span style={{ fontSize: "0.775rem", color: "#94a3b8" }}>
              {MOCK_COURSE.totalEnrolled} enrolled
            </span>
          </div>

          {MOCK_COURSE.students.map((student, i) => (
            <div
              key={student.name}
              className="flex items-center justify-between px-5 py-4"
              style={{ borderBottom: i < MOCK_COURSE.students.length - 1 ? "1px solid #f8fafc" : "none" }}
            >
              <div className="flex items-center gap-3 min-w-0">
                <div
                  className="flex items-center justify-center w-9 h-9 rounded-full shrink-0"
                  style={{ backgroundColor: "#eef2ff" }}
                >
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#4f46e5" }}>
                    {student.name.split(" ").map((n) => n[0]).join("")}
                  </span>
                </div>
                <div className="min-w-0">
                  <p style={{ fontWeight: 600, color: "#1e1b4b", fontSize: "0.875rem" }}>{student.name}</p>
                  <div className="flex items-center gap-1" style={{ color: "#94a3b8", fontSize: "0.75rem" }}>
                    <Clock size={11} />
                    {student.lastActive}
                  </div>
                </div>
              </div>

                <div className="flex items-center gap-4 shrink-0 ml-4">
                {/* Progress */}
                <div className="hidden sm:flex flex-col items-end" style={{ minWidth: "80px" }}>
                  <span style={{ fontSize: "0.775rem", color: "#94a3b8", marginBottom: "3px" }}>Progress</span>
                  <div className="flex items-center gap-1.5">
                    <div style={{ width: "56px", height: "5px", backgroundColor: "#e0e7ff", borderRadius: "999px" }}>
                      <div style={{ width: `${student.progress}%`, height: "100%", backgroundColor: "#4f46e5", borderRadius: "999px" }} />
                    </div>
                    <span style={{ fontSize: "0.775rem", fontWeight: 700, color: "#4f46e5" }}>{student.progress}%</span>
                  </div>
                </div>

                {/* Score badge */}
                <div className="flex flex-col items-end" style={{ minWidth: "48px" }}>
                  <span style={{ fontSize: "0.775rem", color: "#94a3b8", marginBottom: "3px" }}>Score</span>
                  <span
                    className="px-2 py-0.5 rounded text-xs font-bold"
                    style={{
                      backgroundColor: "#e0f2fe",
                      color: "#1d4ed8",
                    }}
                  >
                    {student.score}%
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
