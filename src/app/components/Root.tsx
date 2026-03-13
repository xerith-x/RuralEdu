import { useState, useEffect, useCallback } from "react";
import { Outlet, useLocation } from "react-router";
import { Toaster, toast } from "sonner";
import { Navbar } from "./Navbar";
import { getUser, clearSession, type User } from "../../utils/session";
import type { RootOutletCtx } from "../../types";

// Re-export so consumers can import from Root if they prefer
export type { RootOutletCtx };

export function Root() {
  const location = useLocation();

  // ── Network state ───────────────────────────────────────
  const [isOnline, setIsOnline] = useState(navigator.onLine);

  useEffect(() => {
    const goOnline = () => {
      setIsOnline(true);
      toast.success("Back online!", {
        description: "Your progress is syncing to the cloud.",
        icon: "☁️",
        duration: 3000,
      });
    };
    const goOffline = () => setIsOnline(false);

    window.addEventListener("online", goOnline);
    window.addEventListener("offline", goOffline);
    return () => {
      window.removeEventListener("online", goOnline);
      window.removeEventListener("offline", goOffline);
    };
  }, []);

  // ── Session state ───────────────────────────────────────
  const [user, setUser] = useState<User | null>(() => getUser());

  const logout = useCallback(() => {
    clearSession();
    setUser(null);
  }, []);

  // ── Page flags ──────────────────────────────────────────
  const isPublicPage =
    location.pathname === "/" || location.pathname === "/login";

  return (
    <div
      style={{
        fontFamily: "'Inter', 'Poppins', sans-serif",
        backgroundColor: "#f0f9ff",
        minHeight: "100vh",
      }}
    >
      <Toaster position="top-right" richColors />

      <Navbar isOnline={isOnline} user={user} onLogout={logout} />

      {/* Offline banner — shown only on authenticated pages */}
      {!isOnline && !isPublicPage && (
        <div
          className="flex items-center justify-center gap-2 py-2 px-4"
          style={{ backgroundColor: "#e0f2fe", borderBottom: "1px solid #bae6fd" }}
        >
          <span>⚠️</span>
          <p style={{ fontSize: "0.85rem", color: "#0369a1" }}>
            You're offline. Only downloaded content is accessible.
          </p>
        </div>
      )}

      <main>
        <Outlet context={{ isOnline, user, setUser, logout } as RootOutletCtx} />
      </main>
    </div>
  );
}