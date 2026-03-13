// ─────────────────────────────────────────────────────────
// Session Utility — reads/writes user from localStorage
// Swap localStorage for a cookie or JWT lib when going to production
// ─────────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  role: "student" | "teacher";
  email: string;
}

export function getUser(): User | null {
  try {
    return JSON.parse(localStorage.getItem("user") || "null");
  } catch {
    return null;
  }
}

export function saveUser(user: User, token: string): void {
  localStorage.setItem("user", JSON.stringify(user));
  localStorage.setItem("token", token);
}

export function clearSession(): void {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
}

export function getToken(): string | null {
  return localStorage.getItem("token");
}
