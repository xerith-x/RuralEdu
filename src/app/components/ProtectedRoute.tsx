import { Navigate } from "react-router";
import { getUser } from "../../utils/session";

interface Props {
  children: React.ReactNode;
  requiredRole?: "student" | "teacher";
}

/**
 * ProtectedRoute — wraps any page that requires authentication.
 * Reads directly from localStorage (via getUser) so it works
 * without needing outlet context.
 *
 * Usage in routes.tsx:
 *   element: <ProtectedRoute requiredRole="student"><StudentDashboard /></ProtectedRoute>
 */
export function ProtectedRoute({ children, requiredRole }: Props) {
  const user = getUser();

  // No session → send to login
  if (!user) return <Navigate to="/login" replace />;

  // Wrong role → send to home (role-based redirect happens there)
  if (requiredRole && user.role !== requiredRole) return <Navigate to="/" replace />;

  return <>{children}</>;
}
