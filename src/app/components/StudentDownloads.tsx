import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { BookOpen, CloudOff, CloudDownload, ChevronRight } from "lucide-react";
import { getStudentCourses, type Course } from "../../services/api";
import { getUser } from "../../utils/session";

interface OutletCtx {
  isOnline: boolean;
}

export function StudentDownloads() {
  const navigate = useNavigate();
  const { isOnline } = useOutletContext<OutletCtx>();
  const user = getUser();

  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [notes, setNotes] = useState<Record<string, string>>({});

  useEffect(() => {
    if (!user) return;
    getStudentCourses(user.id)
      .then((all) => setCourses(all.filter((c) => c.isDownloaded)))
      .finally(() => setLoading(false));
  }, []);

  const downloaded = courses;

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#f0f9ff" }}>
      <div className="max-w-5xl mx-auto">
        <div className="mb-6 flex items-center justify-between gap-3">
          <button
            onClick={() => navigate("/student-dashboard")}
            className="flex items-center gap-2"
            style={{
              background: "none",
              border: "none",
              cursor: "pointer",
              color: "#4f46e5",
              fontSize: "0.9rem",
              fontWeight: 600,
              padding: 0,
            }}
          >
            ← Back to dashboard
          </button>
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.25rem",
              fontWeight: 800,
              color: "#1e1b4b",
              margin: 0,
            }}
          >
            Downloaded classes & notes
          </h1>
        </div>

        {!isOnline && (
          <div
            className="flex items-center gap-2 px-4 py-3 rounded-lg mb-4"
            style={{ backgroundColor: "#e0f2fe", border: "1px solid #bae6fd" }}
          >
            <CloudOff size={15} color="#0369a1" />
            <p style={{ fontSize: "0.85rem", color: "#0f172a" }}>
              You're offline — everything on this page is ready to play offline.
            </p>
          </div>
        )}

        <section className="mb-6">
          <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.05rem", marginBottom: "6px" }}>
            Quick notes
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#64748b", marginBottom: "8px" }}>
            Use this space to jot down anything you want to remember while studying.
          </p>
          <textarea
            rows={3}
            value={notes["__general"] ?? ""}
            onChange={(e) => setNotes((prev) => ({ ...prev, __general: e.target.value }))}
            style={{
              width: "100%",
              padding: "10px 14px",
              borderRadius: "10px",
              border: "1.5px solid #e0e7ff",
              outline: "none",
              fontSize: "0.9rem",
              color: "#1e1b4b",
              backgroundColor: "#ffffff",
              boxSizing: "border-box",
            }}
          />
        </section>

        <section>
          <div className="flex items-center gap-2 mb-4">
            <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.05rem" }}>
              Downloaded classes
            </h2>
          </div>

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
                You haven't downloaded any classes yet.
              </p>
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
            >
              {downloaded.map((course, i) => (
                <div
                  key={course.id}
                  className="flex flex-col sm:flex-row sm:items-center justify-between px-5 py-4 gap-3"
                  style={{
                    borderBottom: i < downloaded.length - 1 ? "1px solid #f1f5f9" : "none",
                  }}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <div
                      className="flex items-center justify-center w-9 h-9 rounded-lg shrink-0"
                      style={{ backgroundColor: "#e0f2fe" }}
                    >
                      <BookOpen size={16} color="#2563eb" />
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

                  <div className="flex flex-col sm:flex-row sm:items-center gap-3 shrink-0 sm:ml-4 w-full sm:w-auto">
                    <textarea
                      rows={2}
                      placeholder="Notes for this class (optional)"
                      value={notes[course.id] ?? ""}
                      onChange={(e) =>
                        setNotes((prev) => ({ ...prev, [course.id]: e.target.value }))
                      }
                      style={{
                        flex: 1,
                        minWidth: 0,
                        padding: "8px 10px",
                        borderRadius: "9px",
                        border: "1px solid #e0e7ff",
                        fontSize: "0.8rem",
                        resize: "vertical",
                      }}
                    />
                    <button
                      onClick={() => navigate("/lesson")}
                      className="flex items-center justify-center gap-1 px-3 py-1.5 rounded-lg font-semibold transition-colors"
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
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

