import type { User } from "../utils/session";

// Shared outlet context type passed from Root to all child routes
export interface RootOutletCtx {
  isOnline: boolean;
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
}
