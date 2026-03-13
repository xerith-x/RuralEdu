import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import {
  ArrowLeft, Play, CloudDownload, CheckCircle,
  ChevronRight, Clock, BookOpen, Volume2, Maximize2,
} from "lucide-react";
import type { RootOutletCtx } from "../../types";

const chapters = [
  { id: 1, title: "Understanding the Internet",      duration: "12 min", completed: true  },
  { id: 2, title: "How Browsers Work",               duration: "9 min",  completed: true  },
  { id: 3, title: "Searching the Web Effectively",   duration: "15 min", completed: false },
  { id: 4, title: "Online Safety & Privacy",         duration: "11 min", completed: false },
  { id: 5, title: "Email and Communication",         duration: "13 min", completed: false },
];

export function Lesson() {
  const { isOnline } = useOutletContext<RootOutletCtx>();
  const navigate = useNavigate();
  const [isDownloaded, setIsDownloaded]   = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);
  const [isPlaying, setIsPlaying]         = useState(false);
  const [activeChapter, setActiveChapter] = useState(1);

  function handleDownload() {
    if (!isOnline && !isDownloaded) return;
    setIsDownloading(true);
    setTimeout(() => { setIsDownloaded(true); setIsDownloading(false); }, 2000);
  }

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#f0f9ff" }}>
      <div className="max-w-5xl mx-auto px-6 py-8">

        {/* Back */}
        <button
          onClick={() => navigate("/student-dashboard")}
          className="flex items-center gap-2 mb-6"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontWeight: 500, fontSize: "0.9375rem", padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4f46e5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
        >
          <ArrowLeft size={18} />
          Back to Dashboard
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* ── Main Content ── */}
          <div className="lg:col-span-2">

            {/* Video Player */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#0f172a", aspectRatio: "16/9", position: "relative" }}
            >
              <div
                style={{
                  position: "absolute", inset: 0,
                  backgroundImage: "linear-gradient(135deg, #1e1b4b 0%, #312e81 50%, #1e1b4b 100%)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  flexDirection: "column", gap: "16px",
                }}
              >
                {/* Dot grid */}
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.05) 1px, transparent 0)", backgroundSize: "32px 32px" }} />

                {/* Chapter label */}
                <div
                  style={{
                    position: "absolute", top: "16px", left: "16px",
                    backgroundColor: "rgba(255,255,255,0.1)", backdropFilter: "blur(4px)",
                    borderRadius: "8px", padding: "6px 12px",
                    color: "white", fontSize: "0.8125rem", fontWeight: 600,
                  }}
                >
                  📚 Basic Computer Skills · Ch.{activeChapter}
                </div>

                {/* Duration */}
                <div
                  style={{
                    position: "absolute", top: "16px", right: "16px",
                    backgroundColor: "rgba(0,0,0,0.5)", borderRadius: "8px", padding: "6px 12px",
                    color: "white", fontSize: "0.8125rem",
                    display: "flex", alignItems: "center", gap: "6px",
                  }}
                >
                  <Clock size={13} />
                  {chapters[activeChapter - 1]?.duration ?? "12 min"}
                </div>

                {/* Play button */}
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  style={{
                    position: "relative", zIndex: 1,
                    width: "72px", height: "72px", borderRadius: "50%",
                    backgroundColor: "#4f46e5",
                    border: "3px solid rgba(255,255,255,0.3)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    cursor: "pointer",
                    boxShadow: "0 0 0 12px rgba(79,70,229,0.18)",
                    transition: "transform 0.15s",
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.08)")}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
                >
                  {isPlaying ? (
                    <div style={{ display: "flex", gap: "5px" }}>
                      <div style={{ width: "4px", height: "20px", backgroundColor: "white", borderRadius: "2px" }} />
                      <div style={{ width: "4px", height: "20px", backgroundColor: "white", borderRadius: "2px" }} />
                    </div>
                  ) : (
                    <Play size={28} fill="white" color="white" style={{ marginLeft: "4px" }} />
                  )}
                </button>

                <p style={{ position: "relative", zIndex: 1, color: "rgba(255,255,255,0.5)", fontSize: "0.875rem" }}>
                  {isPlaying ? "Now Playing" : "Click to play lesson"}
                </p>

                {/* Controls bar */}
                <div
                  style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "12px 16px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.7), transparent)",
                    display: "flex", alignItems: "center", gap: "12px",
                  }}
                >
                  <div style={{ flex: 1, height: "3px", backgroundColor: "rgba(255,255,255,0.2)", borderRadius: "999px", position: "relative" }}>
                    <div
                      style={{
                        width: isPlaying ? "35%" : "0%", height: "100%",
                        backgroundColor: "#6366f1", borderRadius: "999px", transition: "width 0.3s",
                      }}
                    />
                  </div>
                  <Volume2  size={16} color="rgba(255,255,255,0.6)" />
                  <Maximize2 size={16} color="rgba(255,255,255,0.6)" />
                </div>
              </div>
            </div>

            {/* Lesson Details */}
            <div className="mt-6">
              <h1
                style={{
                  fontFamily: "'Poppins', sans-serif",
                  fontSize: "1.625rem", fontWeight: 800, color: "#1e1b4b", lineHeight: 1.3,
                }}
              >
                {chapters[activeChapter - 1]?.title ?? "Chapter 1"}
              </h1>
              <div className="flex items-center gap-4 mt-2">
                <span style={{ fontSize: "0.8125rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                  <Clock size={13} /> {chapters[activeChapter - 1]?.duration}
                </span>
                <span style={{ fontSize: "0.8125rem", color: "#94a3b8", display: "flex", alignItems: "center", gap: "4px" }}>
                  <BookOpen size={13} /> Basic Computer Skills
                </span>
              </div>

              <p className="mt-5" style={{ fontSize: "0.9375rem", color: "#475569", lineHeight: 1.8 }}>
                In this chapter, you'll discover what the internet really is — not just a magic cloud,
                but a global network of computers talking to each other. We'll cover how data travels
                through cables and wireless signals, what IP addresses are, and why understanding the
                internet's foundations makes you a smarter, safer digital citizen.
              </p>

              {/* Learning outcomes */}
              <div
                className="mt-6 p-5 rounded-xl"
                style={{ backgroundColor: "#eef2ff", border: "1px solid #c7d2fe" }}
              >
                <h3 style={{ fontWeight: 700, color: "#3730a3", fontSize: "0.9375rem", marginBottom: "10px" }}>
                  🎯 What you'll learn
                </h3>
                {[
                  "How data packets travel across the internet",
                  "The difference between internet and WWW",
                  "What DNS, IP addresses, and servers do",
                  "How to stay safe while browsing online",
                ].map((item) => (
                  <div key={item} className="flex items-center gap-2 mb-2">
                    <CheckCircle size={14} color="#4f46e5" style={{ flexShrink: 0 }} />
                    <span style={{ fontSize: "0.875rem", color: "#3730a3" }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar: Chapter List ── */}
          <div className="lg:col-span-1">
            <h3
              style={{
                fontWeight: 700, color: "#1e1b4b", fontSize: "1rem",
                marginBottom: "12px", fontFamily: "'Poppins', sans-serif",
              }}
            >
              Course Chapters
            </h3>
            <div
              className="rounded-2xl overflow-hidden"
              style={{ border: "1px solid #e0e7ff", backgroundColor: "white" }}
            >
              {chapters.map((ch, i) => (
                <button
                  key={ch.id}
                  onClick={() => setActiveChapter(ch.id)}
                  className="w-full flex items-center gap-3 p-4 text-left"
                  style={{
                    background: activeChapter === ch.id ? "#eef2ff" : "white",
                    borderBottom: i < chapters.length - 1 ? "1px solid #f1f5f9" : "none",
                    borderLeft: activeChapter === ch.id ? "3px solid #4f46e5" : "3px solid transparent",
                    cursor: "pointer",
                    transition: "background 0.1s",
                  }}
                >
                  <div
                    className="flex items-center justify-center w-8 h-8 rounded-full flex-shrink-0"
                    style={{
                      backgroundColor: ch.completed ? "#4f46e5" : activeChapter === ch.id ? "#c7d2fe" : "#f1f5f9",
                    }}
                  >
                    {ch.completed ? (
                      <CheckCircle size={14} color="white" />
                    ) : (
                      <span style={{ fontSize: "0.75rem", fontWeight: 700, color: activeChapter === ch.id ? "#4f46e5" : "#94a3b8" }}>
                        {ch.id}
                      </span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p
                      style={{
                        fontSize: "0.8125rem",
                        fontWeight: activeChapter === ch.id ? 700 : 500,
                        color: activeChapter === ch.id ? "#4f46e5" : "#374151",
                        whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis",
                      }}
                    >
                      {ch.title}
                    </p>
                    <p style={{ fontSize: "0.75rem", color: "#94a3b8", marginTop: "1px" }}>{ch.duration}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Sticky Bottom Bar ── */}
      <div
        style={{
          position: "sticky", bottom: 0,
          backgroundColor: "white",
          borderTop: "1px solid #e0e7ff",
          padding: "16px 24px", zIndex: 40,
        }}
      >
        <div className="max-w-5xl mx-auto flex items-center justify-between gap-4">
          {isDownloaded ? (
            <div className="flex items-center gap-2">
              <CheckCircle size={18} color="#4f46e5" />
              <span style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#4f46e5" }}>Saved Offline</span>
            </div>
          ) : (
            <button
              onClick={handleDownload}
              disabled={!isOnline || isDownloading}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl"
              style={{
                backgroundColor: !isOnline ? "#f1f5f9" : "#eef2ff",
                border: `1px solid ${!isOnline ? "#e2e8f0" : "#c7d2fe"}`,
                color: !isOnline ? "#94a3b8" : "#4f46e5",
                fontWeight: 600, fontSize: "0.9375rem",
                cursor: !isOnline ? "not-allowed" : "pointer",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => { if (isOnline && !isDownloading) e.currentTarget.style.backgroundColor = "#e0e7ff"; }}
              onMouseLeave={(e) => { if (isOnline) e.currentTarget.style.backgroundColor = "#eef2ff"; }}
            >
              <CloudDownload size={18} />
              {isDownloading ? "Downloading…" : !isOnline ? "Go Online to Download" : "Download Lesson"}
            </button>
          )}

          <button
            onClick={() => navigate("/quiz")}
            className="flex items-center gap-2 px-6 py-3 rounded-xl"
            style={{
              backgroundColor: "#4f46e5", color: "white",
              fontWeight: 700, fontSize: "0.9375rem",
              border: "none", cursor: "pointer",
              boxShadow: "0 4px 16px rgba(79,70,229,0.3)",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
          >
            Take Chapter Quiz
            <ChevronRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
