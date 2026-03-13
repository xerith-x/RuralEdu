import { useNavigate } from "react-router";
import { ArrowRight, BookOpen, Users, Zap, Globe } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

const HERO_IMAGE = "https://images.unsplash.com/photo-1759143101324-d375443f1955?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGlsZHJlbiUyMGxlYXJuaW5nJTIwY2xhc3Nyb29tJTIwcnVyYWwlMjBzY2hvb2x8ZW58MXx8fHwxNzczNDMxNTA5fDA&ixlib=rb-4.1.0&q=80&w=1080";

const features = [
  {
    icon: <Zap size={22} color="#4f46e5" />,
    title: "Works Without Internet",
    description: "Download lessons once, access them anytime – even in areas with no connectivity.",
  },
  {
    icon: <BookOpen size={22} color="#4f46e5" />,
    title: "Curriculum-Aligned",
    description: "Content mapped to national standards for English, Math, and Digital Literacy.",
  },
  {
    icon: <Users size={22} color="#4f46e5" />,
    title: "Built for Communities",
    description: "Designed with feedback from 200+ rural teachers across 12 districts.",
  },
  {
    icon: <Globe size={22} color="#4f46e5" />,
    title: "Multiple Languages",
    description: "Lessons available in English and 4 regional languages for inclusive learning.",
  },
];

export function Landing() {
  const navigate = useNavigate();

  return (
    <div style={{ backgroundColor: "#f0f9ff" }}>
      {/* ── Hero ── */}
      <section className="pt-24 pb-16 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Left */}
          <div>
            <h1
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(2rem, 5vw, 3.25rem)",
                fontWeight: 800,
                lineHeight: 1.15,
                color: "#1e1b4b",
                letterSpacing: "-0.02em",
              }}
            >
              Education that{" "}
              <span style={{ color: "#4f46e5" }}>never stops,</span>
              <br />
              even without internet.
            </h1>

            <p
              className="mt-6"
              style={{ fontSize: "1.125rem", color: "#475569", lineHeight: 1.7, maxWidth: "480px" }}
            >
              Interactive English and digital literacy modules designed for rural schools.
              Download once, learn anywhere — no Wi-Fi required.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <button
                onClick={() => navigate("/login")}
                className="flex items-center gap-2 px-6 py-3 rounded-xl"
                style={{
                  backgroundColor: "#4f46e5",
                  color: "white",
                  fontWeight: 600,
                  fontSize: "1rem",
                  border: "none",
                  cursor: "pointer",
                  boxShadow: "0 8px 24px rgba(79,70,229,0.35)",
                  transition: "background 0.15s",
                }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
              >
                Start Learning
                <ArrowRight size={18} />
              </button>
            </div>

            {/* Stats */}
            <div className="mt-12 flex gap-8">
              {[
                { value: "50+",  label: "Lessons Available" },
                { value: "12K+", label: "Active Students" },
                { value: "4.9★", label: "Teacher Rating" },
              ].map((stat) => (
                <div key={stat.label}>
                  <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#1e1b4b" }}>{stat.value}</p>
                  <p style={{ fontSize: "0.8rem", color: "#94a3b8", marginTop: "2px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right – Blob Image */}
          <div className="flex justify-center items-center">
            <div style={{ position: "relative", width: "100%", maxWidth: "500px" }}>
              <div
                style={{
                  borderRadius: "50% 50% 40% 60% / 60% 40% 60% 40%",
                  overflow: "hidden",
                  width: "100%",
                  aspectRatio: "1",
                  boxShadow: "0 24px 64px rgba(79,70,229,0.18)",
                  border: "6px solid #c7d2fe",
                }}
              >
                <ImageWithFallback
                  src={HERO_IMAGE}
                  alt="Students learning in a rural classroom"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                />
              </div>
              {/* Floating badges */}
              <div
                style={{
                  position: "absolute", bottom: "10%", left: "-8%",
                  backgroundColor: "white", borderRadius: "16px", padding: "12px 16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  display: "flex", alignItems: "center", gap: "8px",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>📶</span>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e1b4b", margin: 0 }}>Offline Ready</p>
                  <p style={{ fontSize: "0.65rem", color: "#94a3b8", margin: 0 }}>No internet needed</p>
                </div>
              </div>
              <div
                style={{
                  position: "absolute", top: "8%", right: "-4%",
                  backgroundColor: "white", borderRadius: "16px", padding: "12px 16px",
                  boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                  display: "flex", alignItems: "center", gap: "8px",
                }}
              >
                <span style={{ fontSize: "1.5rem" }}>🎯</span>
                <div>
                  <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#1e1b4b", margin: 0 }}>+10 Points!</p>
                  <p style={{ fontSize: "0.65rem", color: "#94a3b8", margin: 0 }}>Quiz completed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <p style={{ fontSize: "0.875rem", fontWeight: 600, color: "#4f46e5", marginBottom: "8px", letterSpacing: "0.05em" }}>
              WHY RURALEDU
            </p>
            <h2
              style={{
                fontFamily: "'Poppins', sans-serif",
                fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
                fontWeight: 800,
                color: "#1e1b4b",
                lineHeight: 1.3,
              }}
            >
              Built for every student,<br />everywhere.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div
                key={f.title}
                className="p-6 rounded-2xl"
                style={{ border: "1px solid #e0e7ff", backgroundColor: "#f5f3ff", transition: "box-shadow 0.15s" }}
                onMouseEnter={(e) => (e.currentTarget.style.boxShadow = "0 4px 20px rgba(79,70,229,0.12)")}
                onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
              >
                <div
                  className="flex items-center justify-center w-11 h-11 rounded-xl mb-4"
                  style={{ backgroundColor: "#eef2ff" }}
                >
                  {f.icon}
                </div>
                <h3 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem", marginBottom: "8px" }}>{f.title}</h3>
                <p style={{ fontSize: "0.875rem", color: "#64748b", lineHeight: 1.6 }}>{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6" style={{ backgroundColor: "#f0f9ff" }}>
        <div className="max-w-3xl mx-auto text-center">
          <h2
            style={{
              fontFamily: "'Poppins', sans-serif",
              fontSize: "clamp(1.5rem, 3vw, 2.25rem)",
              fontWeight: 800,
              color: "#1e1b4b",
              lineHeight: 1.3,
              marginBottom: "16px",
            }}
          >
            Ready to start learning today?
          </h2>
          <p style={{ fontSize: "1.125rem", color: "#475569", marginBottom: "32px" }}>
            Join thousands of students already using RuralEdu to unlock their potential.
          </p>
          <button
            onClick={() => navigate("/login")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl"
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              fontWeight: 700,
              fontSize: "1.0625rem",
              border: "none",
              cursor: "pointer",
              boxShadow: "0 8px 24px rgba(79,70,229,0.35)",
              transition: "background 0.15s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
          >
            Get Started for Free
            <ArrowRight size={20} />
          </button>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="py-8 px-6 border-t" style={{ borderColor: "#e0e7ff", backgroundColor: "white" }}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <BookOpen size={16} color="#4f46e5" />
            <span style={{ fontWeight: 700, color: "#475569", fontSize: "0.875rem" }}>RuralEdu</span>
          </div>
          <p style={{ fontSize: "0.8rem", color: "#94a3b8" }}>
            © 2026 RuralEdu. Empowering rural education everywhere.
          </p>
        </div>
      </footer>
    </div>
  );
}
