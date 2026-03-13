import { Link, useNavigate, useLocation } from "react-router";
import { BookOpen, Wifi, CloudOff, Upload, LogOut, LayoutDashboard } from "lucide-react";
import { clearSession, type User } from "../../utils/session";

interface NavbarProps {
  isOnline: boolean;
  user: User | null;
  onLogout: () => void;
}

// ── Nav link helper ──────────────────────────────────────
function NavLink({
  to,
  children,
  highlight,
}: {
  to: string;
  children: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <Link
      to={to}
      style={{
        fontSize: "0.875rem",
        fontWeight: highlight ? 700 : 500,
        color: highlight ? "#4f46e5" : "#475569",
        textDecoration: "none",
        padding: "4px 2px",
        borderBottom: highlight ? "2px solid #4f46e5" : "2px solid transparent",
        transition: "color 0.15s, border-color 0.15s",
        whiteSpace: "nowrap",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = "#4f46e5";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLAnchorElement).style.color = highlight ? "#4f46e5" : "#475569";
      }}
    >
      {children}
    </Link>
  );
}

export function Navbar({ isOnline, user, onLogout }: NavbarProps) {
  const navigate = useNavigate();
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const teacherTab = searchParams.get("tab") || "analytics";

  function handleLogout() {
    clearSession();
    onLogout();
    navigate("/");
  }

  return (
    <nav
      className="sticky top-0 z-50 flex items-center justify-between px-6 py-3.5 border-b"
      style={{
        backgroundColor: "#ffffff",
        borderColor: "#e0e7ff",
        boxShadow: "0 1px 4px rgba(79,70,229,0.07)",
      }}
    >
      {/* ── Logo — always goes to home "/" ── */}
      <Link
        to="/"
        className="flex items-center gap-2 no-underline"
      >
        <div
          className="flex items-center justify-center w-8 h-8 rounded-lg"
          style={{ backgroundColor: "#4f46e5" }}
        >
          <BookOpen size={16} color="white" strokeWidth={2.5} />
        </div>
        <span
          style={{
            fontFamily: "'Poppins', sans-serif",
            fontWeight: 700,
            fontSize: "1.1rem",
            color: "#1e1b4b",
          }}
        >
          {user?.role === "teacher" ? "RuralEdu Educator" : "RuralEdu"}
        </span>
      </Link>

      {/* ── Nav Links ── */}
      <div className="hidden sm:flex items-center gap-5">
        {/* No user */}
        {!user && (
          <>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/">About</NavLink>
          </>
        )}

        {/* Teacher nav */}
        {user?.role === "teacher" && (
          <>
            <NavLink
              to="/teacher-dashboard?tab=analytics"
              highlight={location.pathname === "/teacher-dashboard" && teacherTab === "analytics"}
            >
              Analytics
            </NavLink>
            <NavLink
              to="/teacher-dashboard?tab=students"
              highlight={location.pathname === "/teacher-dashboard" && teacherTab === "students"}
            >
              Manage Students
            </NavLink>
            <NavLink
              to="/teacher-dashboard?tab=library"
              highlight={location.pathname === "/teacher-dashboard" && teacherTab === "library"}
            >
              Content Library
            </NavLink>
          </>
        )}

        {/* Student nav */}
        {user?.role === "student" && (
          <>
            <NavLink
              to="/student-dashboard"
              highlight={location.pathname === "/student-dashboard"}
            >
              My Progress
            </NavLink>
            <NavLink
              to="/downloads"
              highlight={location.pathname === "/downloads"}
            >
              Downloaded Classes
            </NavLink>
          </>
        )}
      </div>

      {/* ── Right Controls ── */}
      <div className="flex items-center gap-3">
        {/* Online / Offline badge */}
        <div
          className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full"
          style={{
            backgroundColor: isOnline ? "#e0f2fe" : "#f1f5f9",
            border: isOnline ? "1px solid #bae6fd" : "1px solid #e2e8f0",
          }}
        >
          {isOnline ? (
            <Wifi size={13} color="#0369a1" strokeWidth={2.5} />
          ) : (
            <CloudOff size={13} color="#94a3b8" strokeWidth={2.5} />
          )}
          <span
            style={{
              fontSize: "0.75rem",
              fontWeight: 600,
              color: isOnline ? "#0f172a" : "#94a3b8",
              whiteSpace: "nowrap",
            }}
          >
            {isOnline ? "Online" : "Offline"}
          </span>
        </div>

        {/* Teacher: Upload button → /teacher/upload */}
        {user?.role === "teacher" && (
          <button
            onClick={() => navigate("/teacher/upload")}
            className="hidden sm:flex items-center gap-1.5 px-4 py-1.5 rounded-lg text-white font-semibold transition-colors"
            style={{
              backgroundColor: "#4f46e5",
              border: "none",
              cursor: "pointer",
              fontSize: "0.825rem",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
          >
            <Upload size={14} />
            + Upload
          </button>
        )}

        {/* Logged-in: Dashboard shortcut */}
        {user && (
          <button
            onClick={() => navigate(user.role === "teacher" ? "/teacher-dashboard" : "/student-dashboard")}
            className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
            style={{
              backgroundColor: "#eef2ff",
              border: "1px solid #c7d2fe",
              cursor: "pointer",
              color: "#4f46e5",
              fontSize: "0.825rem",
              fontWeight: 600,
            }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e7ff")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#eef2ff")}
          >
            <LayoutDashboard size={14} />
            Dashboard
          </button>
        )}

        {/* No user: Login button */}
        {!user && location.pathname !== "/login" && (
          <Link
            to="/login"
            className="flex items-center gap-1.5 px-4 py-1.5 rounded-lg font-semibold transition-colors"
            style={{
              backgroundColor: "#4f46e5",
              color: "white",
              textDecoration: "none",
              fontSize: "0.875rem",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#4338ca")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLAnchorElement).style.backgroundColor = "#4f46e5")}
          >
            Login
          </Link>
        )}

        {/* Logged-in: Logout */}
        {user && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-colors"
            style={{
              background: "none",
              border: "1px solid #e0e7ff",
              cursor: "pointer",
              color: "#475569",
              fontSize: "0.825rem",
              fontWeight: 500,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#f1f5f9";
              e.currentTarget.style.color = "#1e1b4b";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#475569";
            }}
          >
            <LogOut size={14} />
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}