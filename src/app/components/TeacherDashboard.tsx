import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Upload, Users, Download, BookOpen, TrendingUp, Calendar } from "lucide-react";
import { getTeacherAnalytics, type TeacherAnalytics } from "../../services/api";
import { getUser } from "../../utils/session";

const SUBJECT_COLORS: Record<string, string> = {
  Mathematics: " #1d4ed8",
  English: "#2563eb",
  "Digital Literacy": "#4f46e5",
  Science: "#3b82f6",
};

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function TeacherDashboard() {
  const navigate = useNavigate();
  const user = getUser();
  const [analytics, setAnalytics] = useState<TeacherAnalytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    getTeacherAnalytics(user.id)
      .then(setAnalytics)
      .finally(() => setLoading(false));
  }, []);

  const stats = analytics
    ? [
        {
          label: "Total Students",
          value: analytics.totalStudents,
          icon: <Users size={20} color="#1d4ed8" />,
          bg: "#e0f2fe",
        },
        {
          label: "Total Downloads",
          value: analytics.totalDownloads.toLocaleString(),
          icon: <Download size={20} color="#2563eb" />,
          bg: "#dbeafe",
        },
        {
          label: "Active Courses",
          value: analytics.activeCourses,
          icon: <BookOpen size={20} color="#4f46e5" />,
          bg: "#eef2ff",
        },
        {
          label: "Avg. Completion",
          value: `${analytics.avgCompletion}%`,
          icon: <TrendingUp size={20} color="#1e3a8a" />,
          bg: "#e0f2fe",
        },
      ]
    : [];

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#f0f9ff" }}>
      <div className="max-w-5xl mx-auto">

        {/* ── Header ── */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-1">
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.75rem",
                  fontWeight: 800,
                  color: "#1e1b4b",
                  margin: 0,
                }}
              >
                Prof. {user?.name ?? "Teacher"}
              </h1>
              <span
                className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold"
                style={{ backgroundColor: "#d1fae5", color: "#065f46" }}
              >
                ✅ Verified Educator
              </span>
            </div>
            <p style={{ color: "#475569", fontSize: "0.9rem" }}>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long",
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            </p>
          </div>

          <button
            onClick={() => navigate("/teacher/upload")}
            className="flex items-center gap-2 px-5 py-2.5 rounded-lg text-white font-semibold transition-colors"
            style={{ backgroundColor: "#4f46e5", fontSize: "0.9rem", border: "none", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
          >
            <Upload size={16} />
            + Upload Content
          </button>
        </div>

        {/* ── Quick Stats ── */}
        <section className="mb-8">
          <h2
            className="mb-4"
            style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.05rem" }}
          >
            Quick Stats
          </h2>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="h-24 rounded-xl animate-pulse"
                  style={{ backgroundColor: "#e2e8f0" }}
                />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="flex flex-col gap-3 p-5 rounded-xl"
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #e0e7ff",
                    boxShadow: "0 1px 3px rgba(79,70,229,0.06)",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-10 h-10 rounded-lg"
                    style={{ backgroundColor: stat.bg }}
                  >
                    {stat.icon}
                  </div>
                  <div>
                    <p
                      style={{
                        fontSize: "1.5rem",
                        fontWeight: 800,
                        color: "#1e1b4b",
                        lineHeight: 1,
                        fontFamily: "'Poppins', sans-serif",
                      }}
                    >
                      {stat.value}
                    </p>
                    <p style={{ fontSize: "0.775rem", color: "#94a3b8", marginTop: "3px" }}>
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>

        {/* ── Avg Completion Bar ── */}
        {analytics && (
          <div
            className="mb-8 p-5 rounded-xl"
            style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
          >
            <div className="flex justify-between items-center mb-2">
              <span style={{ fontWeight: 600, color: "#1e1b4b", fontSize: "0.9rem" }}>
                Average Course Completion
              </span>
              <span style={{ fontWeight: 700, color: "#4f46e5" }}>{analytics.avgCompletion}%</span>
            </div>
            <div className="w-full rounded-full" style={{ height: "8px", backgroundColor: "#e0e7ff" }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${analytics.avgCompletion}%`, backgroundColor: "#4f46e5" }}
              />
            </div>
          </div>
        )}

        {/* ── Recent Uploads ── */}
        <section>
          <h2
            className="mb-4"
            style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.05rem" }}
          >
            Recent Uploads
          </h2>

          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="h-16 rounded-xl animate-pulse"
                  style={{ backgroundColor: "#e2e8f0" }}
                />
              ))}
            </div>
          ) : (
            <div
              className="rounded-xl overflow-hidden"
              style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
            >
              {analytics?.recentUploads.map((upload, i) => (
                <div
                  key={upload.id}
                  className="flex items-center justify-between px-5 py-4 cursor-pointer"
                  style={{
                    borderBottom:
                      i < (analytics.recentUploads.length - 1) ? "1px solid #f1f5f9" : "none",
                    transition: "background 0.1s",
                  }}
                  onClick={() => navigate("/teacher/course")}
                  onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#fafafe")}
                  onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
                >
                  <div className="flex items-center gap-3 min-w-0">
                    <span
                      className="shrink-0 px-2 py-0.5 rounded text-xs font-semibold"
                      style={{
                        backgroundColor:
                          SUBJECT_COLORS[upload.subject]
                            ? `${SUBJECT_COLORS[upload.subject]}18`
                            : "#f1f5f9",
                        color: SUBJECT_COLORS[upload.subject] ?? "#475569",
                      }}
                    >
                      {upload.subject}
                    </span>
                    <p
                      className="truncate"
                      style={{ color: "#1e1b4b", fontWeight: 500, fontSize: "0.9rem" }}
                    >
                      {upload.title}
                    </p>
                  </div>

                  <div className="flex items-center gap-4 shrink-0 ml-4">
                    <span
                      className="hidden sm:flex items-center gap-1"
                      style={{ fontSize: "0.8rem", color: "#94a3b8" }}
                    >
                      <Calendar size={12} />
                      {formatDate(upload.uploadedAt)}
                    </span>
                    <span
                      className="flex items-center gap-1"
                      style={{ fontSize: "0.8rem", color: "#64748b", fontWeight: 600 }}
                    >
                      <Download size={12} />
                      {upload.downloads}
                    </span>
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