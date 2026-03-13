import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { motion } from "motion/react";
import { CloudDownload, CheckCircle, Lock, ChevronRight, Trophy, Clock, BookOpen } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

interface OutletContext {
  isOnline: boolean;
}

const COURSE_IMAGES = [
  "https://images.unsplash.com/photo-1759646827278-27c5733e0cee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21wdXRlciUyMHNraWxscyUyMGRpZ2l0YWwlMjBsaXRlcmFjeSUyMGVkdWNhdGlvbnxlbnwxfHx8fDE3NzM0MzE5MzR8MA&ixlib=rb-4.1.0&q=80&w=400",
  "https://images.unsplash.com/photo-1585521551675-64daba4ba31e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmdsaXNoJTIwbGFuZ3VhZ2UlMjBib29rcyUyMHJlYWRpbmclMjBzdHVkeXxlbnwxfHx8fDE3NzM0MzE5MzR8MA&ixlib=rb-4.1.0&q=80&w=400",
  "https://images.unsplash.com/photo-1753939582692-6b01009b9cca?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXRoJTIwc2NpZW5jZSUyMHRhYmxldCUyMHRlY2hub2xvZ3klMjBsZWFybmluZ3xlbnwxfHx8fDE3NzM0MzE5MzV8MA&ixlib=rb-4.1.0&q=80&w=400",
];

const initialCourses = [
  {
    id: 1,
    title: "Basic Computer Skills",
    description: "Learn keyboard, mouse, files, and basic software.",
    duration: "4 hrs",
    lessons: 12,
    progress: 75,
    downloaded: true,
    accentColor: "#2563eb",
    lightColor: "#dbeafe",
    chapter: "Chapter 1: Understanding the Internet",
  },
  {
    id: 2,
    title: "English Communication",
    description: "Improve reading, writing, and speaking in English.",
    duration: "6 hrs",
    lessons: 18,
    progress: 30,
    downloaded: false,
    accentColor: "#1d4ed8",
    lightColor: "#e0f2fe",
    chapter: "Chapter 1: Building Vocabulary",
  },
  {
    id: 3,
    title: "Digital Mathematics",
    description: "Interactive lessons on arithmetic, algebra, geometry.",
    duration: "5 hrs",
    lessons: 15,
    progress: 0,
    downloaded: false,
    accentColor: "#4f46e5",
    lightColor: "#eef2ff",
    chapter: "Chapter 1: Numbers and Operations",
  },
];

const recentActivity = [
  { label: "Completed Quiz: Internet Basics", time: "2 hours ago", icon: "🏅" },
  { label: "Downloaded: Computer Skills Ch.3", time: "Yesterday", icon: "📥" },
  { label: "Started: English Communication", time: "3 days ago", icon: "📖" },
];

export function Dashboard() {
  const { isOnline } = useOutletContext<OutletContext>();
  const navigate = useNavigate();
  const [courses, setCourses] = useState(initialCourses);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);

  const handleDownload = (id: number) => {
    setDownloadingId(id);
    setTimeout(() => {
      setCourses((prev) =>
        prev.map((c) => (c.id === id ? { ...c, downloaded: true } : c))
      );
      setDownloadingId(null);
    }, 1800);
  };

  const overallProgress = Math.round(
    courses.reduce((sum, c) => sum + c.progress, 0) / courses.length
  );

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#f0f9ff" }}>
      <div className="max-w-6xl mx-auto">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: -16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "2rem",
              fontWeight: 800,
              color: "#0f172a",
            }}
          >
            Welcome back, Learner 👋
          </h1>
          <p style={{ color: "#64748b", marginTop: "4px", fontSize: "1rem" }}>
            {new Date().toLocaleDateString("en-US", { weekday: "long", month: "long", day: "numeric" })} — Keep up the great work!
          </p>
        </motion.div>

        {/* Top Stats Row */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-8">
          {[
            { label: "Lessons Completed", value: "27", icon: <BookOpen size={20} style={{ color: "#2563eb" }} /> },
            { label: "Hours Learned", value: "14.5", icon: <Clock size={20} style={{ color: "#1d4ed8" }} /> },
            { label: "Points Earned", value: "340", icon: <Trophy size={20} style={{ color: "#4f46e5" }} /> },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="p-5 rounded-xl flex items-center gap-4"
              style={{ backgroundColor: "white", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div
                className="flex items-center justify-center w-11 h-11 rounded-xl"
                style={{ backgroundColor: "#f8fafc" }}
              >
                {stat.icon}
              </div>
              <div>
                <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0f172a", lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontSize: "0.8125rem", color: "#94a3b8", marginTop: "3px" }}>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Progress Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.25 }}
          className="mt-6 p-6 rounded-2xl"
              style={{ backgroundColor: "white", border: "1px solid #e0e7ff", boxShadow: "0 1px 8px rgba(79,70,229,0.05)" }}
        >
          <div className="flex items-center justify-between mb-3">
            <div>
              <h2 style={{ fontWeight: 700, color: "#0f172a", fontSize: "1.0625rem" }}>
                Overall Progress
              </h2>
              <p style={{ fontSize: "0.875rem", color: "#64748b", marginTop: "2px" }}>
                Across all 3 enrolled courses
              </p>
            </div>
            <span
              style={{
                fontSize: "1.75rem",
                fontWeight: 900,
                color: "#059669",
                fontFamily: "'Poppins', sans-serif",
              }}
            >
              {overallProgress}%
            </span>
          </div>
          <div
            className="w-full rounded-full"
            style={{ height: "12px", backgroundColor: "#e2e8f0" }}
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, ease: "easeOut", delay: 0.4 }}
              className="h-full rounded-full"
              style={{ backgroundColor: "#059669" }}
            />
          </div>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "8px" }}>
            {100 - overallProgress}% remaining to complete your learning path
          </p>
        </motion.div>

        {/* Course Cards Grid */}
        <div className="mt-12">
          <div className="flex items-center justify-between mb-6">
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "1.375rem",
                fontWeight: 800,
                color: "#0f172a",
              }}
            >
              Your Learning Path
            </h2>
            <span style={{ fontSize: "0.875rem", color: "#64748b" }}>3 courses enrolled</span>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {courses.map((course, i) => (
              <motion.div
                key={course.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 + 0.3 }}
                className="rounded-2xl overflow-hidden transition-all duration-200 hover:-translate-y-1 hover:shadow-xl cursor-pointer"
                style={{
                  backgroundColor: "white",
                  border: "1px solid #f1f5f9",
                  boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                }}
                onClick={() => navigate("/lesson")}
              >
                {/* Course Image */}
                <div style={{ height: "140px", overflow: "hidden", position: "relative" }}>
                  <ImageWithFallback
                    src={COURSE_IMAGES[i]}
                    alt={course.title}
                    style={{ width: "100%", height: "100%", objectFit: "cover" }}
                  />
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      background: `linear-gradient(to top, rgba(0,0,0,0.35), transparent)`,
                    }}
                  />
                  {/* Progress Badge */}
                  {course.progress > 0 && (
                    <div
                      style={{
                        position: "absolute",
                        top: "10px",
                        right: "10px",
                        backgroundColor: course.accentColor,
                        color: "white",
                        borderRadius: "999px",
                        padding: "3px 10px",
                        fontSize: "0.75rem",
                        fontWeight: 700,
                      }}
                    >
                      {course.progress}% done
                    </div>
                  )}
                </div>

                {/* Card Body */}
                <div className="p-5">
                  <h3
                    style={{
                      fontWeight: 700,
                      fontSize: "1.0625rem",
                      color: "#0f172a",
                      marginBottom: "6px",
                    }}
                  >
                    {course.title}
                  </h3>
                  <p style={{ fontSize: "0.8125rem", color: "#64748b", lineHeight: 1.5, marginBottom: "12px" }}>
                    {course.description}
                  </p>

                  {/* Meta */}
                  <div className="flex items-center gap-3 mb-4">
                    <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>📚 {course.lessons} lessons</span>
                    <span style={{ fontSize: "0.75rem", color: "#94a3b8" }}>⏱ {course.duration}</span>
                  </div>

                  {/* Progress Bar */}
                  {course.progress > 0 && (
                    <div className="mb-4">
                      <div
                        className="w-full rounded-full"
                        style={{ height: "6px", backgroundColor: "#f1f5f9" }}
                      >
                        <div
                          className="h-full rounded-full"
                          style={{ width: `${course.progress}%`, backgroundColor: course.accentColor }}
                        />
                      </div>
                    </div>
                  )}

                  {/* Bottom: Status + CTA */}
                  <div className="flex items-center justify-between">
                    {/* Offline status badge */}
                    {course.downloaded ? (
                      <div className="flex items-center gap-1.5">
                        <CheckCircle size={14} style={{ color: "#059669" }} />
                        <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#059669" }}>
                          Available Offline
                        </span>
                      </div>
                    ) : isOnline ? (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(course.id);
                        }}
                        disabled={downloadingId === course.id}
                        className="flex items-center gap-1.5 transition-all duration-200 hover:-translate-y-0.5 active:scale-95"
                        style={{
                          background: "none",
                          border: "none",
                          cursor: downloadingId === course.id ? "not-allowed" : "pointer",
                          padding: 0,
                        }}
                      >
                        {downloadingId === course.id ? (
                          <span style={{ fontSize: "0.75rem", color: "#059669", fontWeight: 600 }}>
                            ⏳ Downloading…
                          </span>
                        ) : (
                          <>
                            <CloudDownload size={14} style={{ color: "#059669" }} />
                            <span style={{ fontSize: "0.75rem", fontWeight: 600, color: "#059669" }}>
                              Download
                            </span>
                          </>
                        )}
                      </button>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <Lock size={13} style={{ color: "#94a3b8" }} />
                        <span style={{ fontSize: "0.75rem", color: "#94a3b8", fontWeight: 500 }}>
                          Requires Internet
                        </span>
                      </div>
                    )}

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        navigate("/lesson");
                      }}
                      className="flex items-center gap-1 transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: course.accentColor,
                        fontWeight: 600,
                        fontSize: "0.8125rem",
                        padding: 0,
                      }}
                    >
                      Open <ChevronRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="mt-12 mb-8">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "1.375rem",
              fontWeight: 800,
              color: "#0f172a",
              marginBottom: "16px",
            }}
          >
            Recent Activity
          </h2>
          <div
            className="rounded-2xl overflow-hidden"
            style={{ backgroundColor: "white", border: "1px solid #f1f5f9", boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
          >
            {recentActivity.map((item, i) => (
              <div
                key={item.label}
                className="flex items-center gap-4 px-6 py-4"
                style={{
                  borderBottom: i < recentActivity.length - 1 ? "1px solid #f8fafc" : "none",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>{item.icon}</span>
                <div className="flex-1">
                  <p style={{ fontSize: "0.9375rem", color: "#0f172a", fontWeight: 500 }}>{item.label}</p>
                  <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "2px" }}>{item.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
