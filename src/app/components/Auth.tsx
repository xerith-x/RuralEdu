import { useState } from "react";
import { useNavigate, useOutletContext } from "react-router";
import { BookOpen, Eye, EyeOff, ArrowRight, ArrowLeft, GraduationCap, School } from "lucide-react";
import { loginUser } from "../../services/api";
import { saveUser } from "../../utils/session";
import type { RootOutletCtx } from "../../types";

type AuthMode = "login" | "signup" | "forgot";
type Role = "student" | "teacher";

const DEMO: Record<Role, { email: string; password: string; hint: string }> = {
  student: {
    email: "student@ruraledu.app",
    password: "password123",
    hint: "Demo student — pre-filled. Just click Log In.",
  },
  teacher: {
    email: "teacher@ruraledu.app",
    password: "edupass456",
    hint: "Demo teacher — pre-filled. Just click Log In.",
  },
};

// ── Shared input style ──────────────────────────────────
function inputCls(focused: boolean, accentColor: string) {
  return {
    width: "100%",
    padding: "11px 14px",
    borderRadius: "10px",
    border: focused ? `2px solid ${accentColor}` : "2px solid #e0e7ff",
    outline: "none",
    fontSize: "0.9375rem",
    color: "#1e1b4b",
    backgroundColor: focused ? "#f5f3ff" : "#fafafa",
    transition: "border 0.15s, background 0.15s",
    boxSizing: "border-box" as const,
    boxShadow: focused ? `0 0 0 3px ${accentColor}22` : "none",
  };
}

export function Auth() {
  const navigate = useNavigate();
  const { setUser } = useOutletContext<RootOutletCtx>();

  const [mode, setMode] = useState<AuthMode>("login");
  const [role, setRole] = useState<Role>("student");
  const accent = "#4f46e5"; // indigo-600

  // Login
  const [email, setEmail] = useState(DEMO.student.email);
  const [password, setPassword] = useState(DEMO.student.password);
  const [showPassword, setShowPassword] = useState(false);
  const [emailFocused, setEmailFocused] = useState(false);
  const [passwordFocused, setPasswordFocused] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Signup
  const [signupName, setSignupName] = useState("");
  const [signupEmail, setSignupEmail] = useState("");
  const [signupPassword, setSignupPassword] = useState("");
  const [signupConfirm, setSignupConfirm] = useState("");
  const [showSignupPwd, setShowSignupPwd] = useState(false);
  const [signupSuccess, setSignupSuccess] = useState(false);

  // Forgot
  const [forgotEmail, setForgotEmail] = useState("");
  const [forgotSent, setForgotSent] = useState(false);

  // ── Role switch: auto-fill demo credentials ──────────
  function switchRole(r: Role) {
    setRole(r);
    setEmail(DEMO[r].email);
    setPassword(DEMO[r].password);
    setLoginError("");
  }

  // ── Login handler ────────────────────────────────────
  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    setLoginError("");
    try {
      const { token, user } = await loginUser({ email, password, role });
      saveUser(user, token);
      setUser(user);
      navigate(role === "teacher" ? "/teacher-dashboard" : "/student-dashboard", {
        replace: true,
      });
    } catch {
      setLoginError("Invalid credentials. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }

  async function handleSignup(e: React.FormEvent) {
    e.preventDefault();
    if (signupPassword !== signupConfirm) {
      return;
    }
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setSignupSuccess(true);
  }

  async function handleForgot(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setIsLoading(false);
    setForgotSent(true);
  }

  // ── Spinner ──────────────────────────────────────────
  const Spinner = () => (
    <span
      style={{
        display: "inline-block",
        width: "15px",
        height: "15px",
        border: "2px solid rgba(255,255,255,0.35)",
        borderTopColor: "white",
        borderRadius: "50%",
        animation: "spin 0.65s linear infinite",
      }}
    />
  );

  const primaryBtn = {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "8px",
    width: "100%",
    padding: "11px",
    borderRadius: "10px",
    backgroundColor: isLoading ? "#818cf8" : accent,
    color: "white",
    fontWeight: 700,
    fontSize: "0.9375rem",
    border: "none",
    cursor: isLoading ? "not-allowed" : "pointer",
    transition: "background 0.15s",
  } as const;

  return (
    <div
      className="flex items-center justify-center px-4 py-12"
      style={{ minHeight: "calc(100vh - 60px)", backgroundColor: "#f0f9ff" }}
    >
      <div className="w-full" style={{ maxWidth: "440px" }}>

        {/* ── Card ── */}
        <div
          className="p-8 rounded-2xl"
          style={{
            backgroundColor: "white",
            boxShadow: "0 4px 24px rgba(79,70,229,0.1)",
            border: "1px solid #e0e7ff",
          }}
        >
          {/* Logo */}
          <div className="flex justify-center mb-5">
            <div
              className="flex items-center justify-center w-12 h-12 rounded-xl"
              style={{ backgroundColor: "#eef2ff", border: "2px solid #c7d2fe" }}
            >
              <BookOpen size={22} color={accent} strokeWidth={2.5} />
            </div>
          </div>

          {/* ── Mode tabs (Login / Sign Up) — hidden on forgot ── */}
          {mode !== "forgot" && (
            <div
              className="flex mb-5 rounded-xl p-1"
              style={{ backgroundColor: "#f1f5f9" }}
            >
              {(["login", "signup"] as AuthMode[]).map((tab) => (
                <button
                  key={tab}
                  onClick={() => {
                    setMode(tab);
                    setSignupSuccess(false);
                  }}
                  style={{
                    flex: 1,
                    padding: "8px",
                    border: "none",
                    borderRadius: "10px",
                    cursor: "pointer",
                    fontWeight: 600,
                    fontSize: "0.875rem",
                    transition: "all 0.15s",
                    backgroundColor: mode === tab ? "white" : "transparent",
                    color: mode === tab ? accent : "#94a3b8",
                    boxShadow: mode === tab ? "0 1px 4px rgba(0,0,0,0.08)" : "none",
                  }}
                >
                  {tab === "login" ? "Log In" : "Sign Up"}
                </button>
              ))}
            </div>
          )}

          {/* ── LOGIN ── */}
          {mode === "login" && (
            <form onSubmit={handleLogin}>
              {/* Role picker */}
              <p style={{ fontSize: "0.8rem", fontWeight: 600, color: "#94a3b8", marginBottom: "8px" }}>
                I am a…
              </p>
              <div className="flex gap-3 mb-5">
                {(["student", "teacher"] as Role[]).map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => switchRole(r)}
                    className="flex-1 flex items-center justify-center gap-2 py-2 rounded-lg font-semibold transition-all"
                    style={{
                      border: `2px solid ${role === r ? accent : "#e0e7ff"}`,
                      backgroundColor: role === r ? "#eef2ff" : "white",
                      color: role === r ? accent : "#94a3b8",
                      cursor: "pointer",
                      fontSize: "0.85rem",
                    }}
                  >
                    {r === "student" ? <GraduationCap size={15} /> : <School size={15} />}
                    {r.charAt(0).toUpperCase() + r.slice(1)}
                  </button>
                ))}
              </div>

              {/* Email */}
              <div className="mb-4">
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setEmailFocused(true)}
                  onBlur={() => setEmailFocused(false)}
                  placeholder="you@example.com"
                  required
                  style={inputCls(emailFocused, accent)}
                />
              </div>

              {/* Password */}
              <div className="mb-2">
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                  Password
                </label>
                <div style={{ position: "relative" }}>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setPasswordFocused(true)}
                    onBlur={() => setPasswordFocused(false)}
                    placeholder="Your password"
                    required
                    style={{ ...inputCls(passwordFocused, accent), padding: "11px 40px 11px 14px" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center" }}
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              {/* Forgot link */}
              <div className="flex justify-end mb-4">
                <button
                  type="button"
                  onClick={() => setMode("forgot")}
                  style={{ background: "none", border: "none", cursor: "pointer", color: accent, fontSize: "0.8rem", fontWeight: 600, padding: 0 }}
                >
                  Forgot Password?
                </button>
              </div>

              {loginError && (
                <p style={{ fontSize: "0.825rem", color: "#dc2626", marginBottom: "12px", textAlign: "center" }}>
                  {loginError}
                </p>
              )}

              <button type="submit" disabled={isLoading} style={primaryBtn}>
                {isLoading ? <><Spinner /> Logging in…</> : <>Log In <ArrowRight size={16} /></>}
              </button>

              <p style={{ fontSize: "0.775rem", color: "#94a3b8", textAlign: "center", marginTop: "12px" }}>
                {DEMO[role].hint}
              </p>
            </form>
          )}

          {/* ── SIGN UP ── */}
          {mode === "signup" && (
            signupSuccess ? (
              <div className="text-center py-4">
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>🎉</div>
                <p style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem", marginBottom: "6px" }}>Account Created!</p>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "20px" }}>
                  You're all set. Log in to start learning.
                </p>
                <button
                  onClick={() => { setMode("login"); setSignupSuccess(false); }}
                  style={{ ...primaryBtn, width: "100%" }}
                >
                  Go to Log In <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <form onSubmit={handleSignup}>
                <div className="mb-4">
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Full Name</label>
                  <input type="text" value={signupName} onChange={(e) => setSignupName(e.target.value)} placeholder="Your full name" required style={inputCls(false, accent)} />
                </div>
                <div className="mb-4">
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Email Address</label>
                  <input type="email" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} placeholder="you@example.com" required style={inputCls(false, accent)} />
                </div>
                <div className="mb-4">
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Password</label>
                  <div style={{ position: "relative" }}>
                    <input type={showSignupPwd ? "text" : "password"} value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} placeholder="Create a password" required style={{ ...inputCls(false, accent), padding: "11px 40px 11px 14px" }} />
                    <button type="button" onClick={() => setShowSignupPwd(!showSignupPwd)} style={{ position: "absolute", right: "12px", top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "#94a3b8", display: "flex", alignItems: "center" }}>
                      {showSignupPwd ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                </div>
                <div className="mb-5">
                  <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Confirm Password</label>
                  <input
                    type="password"
                    value={signupConfirm}
                    onChange={(e) => setSignupConfirm(e.target.value)}
                    placeholder="Re-enter your password"
                    required
                    style={{
                      ...inputCls(false, accent),
                      border: signupConfirm && signupPassword !== signupConfirm ? "2px solid #dc2626" : `2px solid #e0e7ff`,
                    }}
                  />
                  {signupConfirm && signupPassword !== signupConfirm && (
                    <p style={{ fontSize: "0.775rem", color: "#dc2626", marginTop: "4px" }}>Passwords do not match.</p>
                  )}
                </div>
                <button
                  type="submit"
                  disabled={isLoading || (!!signupConfirm && signupPassword !== signupConfirm)}
                  style={{ ...primaryBtn, opacity: isLoading ? 0.7 : 1 }}
                >
                  {isLoading ? <><Spinner /> Creating account…</> : <>Create Account <ArrowRight size={16} /></>}
                </button>
              </form>
            )
          )}

          {/* ── FORGOT PASSWORD ── */}
          {mode === "forgot" && (
            forgotSent ? (
              <div className="text-center py-4">
                <div style={{ fontSize: "2.5rem", marginBottom: "12px" }}>📧</div>
                <p style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1rem", marginBottom: "6px" }}>Check your inbox!</p>
                <p style={{ color: "#64748b", fontSize: "0.875rem", marginBottom: "20px" }}>
                  A reset link was sent to <strong>{forgotEmail}</strong>.
                </p>
                <button
                  onClick={() => { setMode("login"); setForgotSent(false); setForgotEmail(""); }}
                  style={{ ...primaryBtn }}
                >
                  Back to Log In <ArrowRight size={16} />
                </button>
              </div>
            ) : (
              <>
                <p style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "1.1rem", marginBottom: "4px", textAlign: "center" }}>
                  Reset Password
                </p>
                <p style={{ color: "#94a3b8", fontSize: "0.875rem", marginBottom: "20px", textAlign: "center" }}>
                  We'll send a reset link to your email.
                </p>
                <form onSubmit={handleForgot}>
                  <div className="mb-5">
                    <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>Email Address</label>
                    <input type="email" value={forgotEmail} onChange={(e) => setForgotEmail(e.target.value)} placeholder="you@example.com" required style={inputCls(false, accent)} />
                  </div>
                  <button type="submit" disabled={isLoading} style={primaryBtn}>
                    {isLoading ? <><Spinner /> Sending…</> : <>Send Reset Link <ArrowRight size={16} /></>}
                  </button>
                </form>
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="flex items-center justify-center gap-1 w-full mt-3"
                  style={{ background: "none", border: "none", cursor: "pointer", color: "#94a3b8", fontSize: "0.85rem", fontWeight: 500, padding: "8px" }}
                  onMouseEnter={(e) => (e.currentTarget.style.color = "#475569")}
                  onMouseLeave={(e) => (e.currentTarget.style.color = "#94a3b8")}
                >
                  <ArrowLeft size={14} /> Back to Log In
                </button>
              </>
            )
          )}
        </div>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}