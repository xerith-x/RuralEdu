import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { CheckCircle, CloudOff, Lock, CloudDownload, ChevronRight, BookOpen } from "lucide-react";
import { getStudentCourses, type Course } from "../../services/api";
import { getUser } from "../../utils/session";

interface OutletCtx {
  isOnline: boolean;
}

const SUBJECT_ACCENT: Record<string, { color: string; bg: string }> = {
  "Digital Literacy": { color: "#2563eb", bg: "#dbeafe" },
  English:            { color: "#1d4ed8", bg: "#e0f2fe" },
  Mathematics:        { color: "#4f46e5", bg: "#eef2ff" },
  Science:            { color: "#3b82f6", bg: "#dbeafe" },
};
const DEFAULT_ACCENT = { color: "#64748b", bg: "#f1f5f9" };

export function StudentDashboard() {
  const navigate = useNavigate();
  const { isOnline } = useOutletContext<OutletCtx>();
  const user = getUser();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [downloadingId, setDownloadingId] = useState<string | null>(null);

  useEffect(() => {
    if (!user) return;
    getStudentCourses(user.id)
      .then(setCourses)
      .finally(() => setLoading(false));
  }, []);

  function handleDownload(id: string) {
    setDownloadingId(id);
    setTimeout(() => {
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, isDownloaded: true } : c))
      );
      setDownloadingId(null);
    }, 1800);
  }

  const inProgress = courses.filter((c) => c.progress > 0 && c.progress < 100);
  const downloaded  = courses.filter((c) => c.isDownloaded);
  const firstName   = user?.name?.split(" ")[0] ?? "Student";

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#f0f9ff" }}>
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="mb-8">
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.75rem",
              fontWeight: 800,
              color: "#1e1b4b",
              margin: 0,
            }}
          >
            Welcome back, {firstName} 👋
          </h1>
          <p style={{ color: "#475569", fontSize: "0.9rem", marginTop: "4px" }}>
            {new Date().toLocaleDateString("en-IN", {
              weekday: "long",
              day: "numeric",
              month: "long",
            })}{" "}
            — Keep learning!
          </p>
        </div>

        {/* ── Continue Learning ── */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.05rem" }}>
              Continue Learning
            </h2>
            <span style={{ fontSize: "0.82rem", color: "#94a3b8" }}>
              {inProgress.length} course{inProgress.length !== 1 ? "s" : ""} in progress
            </span>
          </div>

          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-36 rounded-xl animate-pulse"
                  style={{ backgroundColor: "#e2e8f0" }}
                />
              ))}
            </div>
          ) : inProgress.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 rounded-xl"
              style={{ backgroundColor: "white", border: "1px dashed #c7d2fe" }}
            >
              <BookOpen size={32} color="#c7d2fe" />
              <p style={{ color: "#94a3b8", marginTop: "10px", fontSize: "0.9rem" }}>
                No courses in progress yet. Enroll to start learning!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {inProgress.map((course) => {
                const accent = SUBJECT_ACCENT[course.subject] ?? DEFAULT_ACCENT;
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    accent={accent}
                    isOnline={isOnline}
                    downloadingId={downloadingId}
                    onDownload={handleDownload}
                    onOpen={() => navigate("/lesson")}
                  />
                );
              })}
            </div>
          )}
        </section>

        {/* ── Offline / Downloaded Classes ── */}
        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.05rem" }}>
              Downloaded Classes
            </h2>
            <span
              className="flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-semibold"
              style={{ backgroundColor: "#dbeafe", color: "#1d4ed8" }}
            >
              <CheckCircle size={11} />
              Available Offline
            </span>
          </div>

          {!isOnline && (
            <div
              className="flex items-center gap-2 px-4 py-3 rounded-lg mb-4"
              style={{ backgroundColor: "#e0f2fe", border: "1px solid #bae6fd" }}
            >
              <CloudOff size={15} color="#0369a1" />
              <p style={{ fontSize: "0.85rem", color: "#0f172a" }}>
                You're offline — only downloaded content is playable right now.
              </p>
            </div>
          )}

          {loading ? (
            <div className="space-y-3">
              {[1, 2].map((i) => (
                <div
                  key={i}
                  className="h-20 rounded-xl animate-pulse"
                  style={{ backgroundColor: "#e2e8f0" }}
                />
              ))}
            </div>
          ) : downloaded.length === 0 ? (
            <div
              className="flex flex-col items-center justify-center py-10 rounded-xl"
              style={{ backgroundColor: "white", border: "1px dashed #c7d2fe" }}
            >
              <CloudDownload size={32} color="#c7d2fe" />
              <p style={{ color: "#94a3b8", marginTop: "10px", fontSize: "0.9rem" }}>
                No downloaded classes yet. Download to study offline!
              </p>
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
            >
              {downloaded.map((course, i) => {
                const accent = SUBJECT_ACCENT[course.subject] ?? DEFAULT_ACCENT;
                return (
                  <div
                    key={course.id}
                    className="flex items-center justify-between px-5 py-4"
                    style={{
                      borderBottom:
                        i < downloaded.length - 1 ? "1px solid #f1f5f9" : "none",
                    }}
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div
                        className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                        style={{ backgroundColor: accent.bg }}
                      >
                        <BookOpen size={16} color={accent.color} />
                      </div>
                      <div className="min-w-0">
                        <p
                          className="truncate"
                          style={{ fontWeight: 600, color: "#1e1b4b", fontSize: "0.9rem" }}
                        >
                          {course.title}
                        </p>
                        <p style={{ fontSize: "0.775rem", color: "#94a3b8" }}>
                          {course.completedLessons}/{course.totalLessons} lessons · {course.duration}
                        </p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3 shrink-0 ml-4">
                      {/* Progress */}
                      <div
                        className="hidden sm:flex flex-col items-end"
                        style={{ minWidth: "72px" }}
                      >
                        <span style={{ fontSize: "0.8rem", fontWeight: 700, color: accent.color }}>
                          {course.progress}%
                        </span>
                        <div
                          className="rounded-full mt-1"
                          style={{ width: "72px", height: "5px", backgroundColor: "#e0e7ff" }}
                        >
                          <div
                            className="h-full rounded-full"
                            style={{ width: `${course.progress}%`, backgroundColor: accent.color }}
                          />
                        </div>
                      </div>

                      <button
                        onClick={() => navigate("/lesson")}
                        className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-colors"
                        style={{
                          backgroundColor: "#eef2ff",
                          color: "#4f46e5",
                          border: "none",
                          cursor: "pointer",
                          fontSize: "0.8rem",
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e7ff")}
                        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#eef2ff")}
                      >
                        Open <ChevronRight size={13} />
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </section>

        {/* ── All Courses (not yet downloaded, online only) ── */}
        {isOnline && (
          <section className="mt-10">
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.05rem" }}>
                All Enrolled Courses
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {courses
                .filter((c) => !c.isDownloaded)
                .map((course) => {
                  const accent = SUBJECT_ACCENT[course.subject] ?? DEFAULT_ACCENT;
                  return (
                    <CourseCard
                      key={course.id}
                      course={course}
                      accent={accent}
                      isOnline={isOnline}
                      downloadingId={downloadingId}
                      onDownload={handleDownload}
                      onOpen={() => navigate("/lesson")}
                    />
                  );
                })}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}

// ── Reusable Course Card ──────────────────────────────────

interface CardProps {
  course: Course;
  accent: { color: string; bg: string };
  isOnline: boolean;
  downloadingId: string | null;
  onDownload: (id: string) => void;
  onOpen: () => void;
}

function CourseCard({ course, accent, isOnline, downloadingId, onDownload, onOpen }: CardProps) {
  return (
    <div
      className="p-5 rounded-xl"
      style={{
        backgroundColor: "white",
        border: "1px solid #e0e7ff",
        boxShadow: "0 1px 3px rgba(79,70,229,0.06)",
      }}
    >
      {/* Subject tag + title */}
      <div className="flex items-start justify-between gap-2 mb-3">
        <div>
          <span
            className="inline-block px-2 py-0.5 rounded text-xs font-semibold mb-1.5"
            style={{ backgroundColor: accent.bg, color: accent.color }}
          >
            {course.subject}
          </span>
          <p style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "0.95rem" }}>
            {course.title}
          </p>
          <p style={{ fontSize: "0.775rem", color: "#64748b", marginTop: "2px" }}>
            {course.totalLessons} lessons · {course.duration}
          </p>
        </div>
      </div>

      {/* Progress bar */}
      {course.progress > 0 && (
        <div className="mb-3">
          <div className="flex justify-between mb-1">
            <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>Progress</span>
            <span style={{ fontSize: "0.75rem", fontWeight: 700, color: accent.color }}>
              {course.progress}%
            </span>
          </div>
          <div className="w-full rounded-full" style={{ height: "6px", backgroundColor: "#e0e7ff" }}>
            <div
              className="h-full rounded-full"
              style={{ width: `${course.progress}%`, backgroundColor: accent.color }}
            />
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="flex items-center justify-between mt-2">
        {/* Offline status */}
        {course.isDownloaded ? (
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "0.775rem", fontWeight: 600, color: "#1d4ed8" }}
          >
            <CheckCircle size={13} /> Offline Ready
          </span>
        ) : isOnline ? (
          <button
            onClick={() => onDownload(course.id)}
            disabled={downloadingId === course.id}
            className="flex items-center gap-1 transition-opacity"
            style={{
              background: "none",
              border: "none",
              cursor: downloadingId === course.id ? "not-allowed" : "pointer",
              fontSize: "0.775rem",
              fontWeight: 600,
              color: "#4f46e5",
              padding: 0,
              opacity: downloadingId === course.id ? 0.6 : 1,
            }}
          >
            <CloudDownload size={13} />
            {downloadingId === course.id ? "Downloading…" : "Download"}
          </button>
        ) : (
          <span
            className="flex items-center gap-1"
            style={{ fontSize: "0.775rem", color: "#94a3b8" }}
          >
            <Lock size={12} /> Requires internet
          </span>
        )}

        <button
          onClick={onOpen}
          className="flex items-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-colors"
          style={{
            backgroundColor: "#eef2ff",
            color: "#4f46e5",
            border: "none",
            cursor: "pointer",
            fontSize: "0.8rem",
          }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e7ff")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#eef2ff")}
        >
          Open <ChevronRight size={13} />
        </button>
      </div>
    </div>
  );
}
