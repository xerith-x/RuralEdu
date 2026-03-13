import { createBrowserRouter } from "react-router";
import { Root } from "./components/Root";
import { Landing } from "./components/Landing";
import { Auth } from "./components/Auth";
import { Dashboard } from "./components/Dashboard";
import { Lesson } from "./components/Lesson";
import { Quiz } from "./components/Quiz";
import { TeacherDashboard } from "./components/TeacherDashboard";
import { StudentDashboard } from "./components/StudentDashboard";
import { StudentDownloads } from "./components/StudentDownloads";
import { TeacherUploadPage } from "./components/TeacherUploadPage";
import { TeacherCourseInsight } from "./components/TeacherCourseInsight";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      // ── Public ──────────────────────────────────────────
      // Logo always brings you back here — no auto-redirect after login
      { index: true, Component: Landing },
      { path: "login", Component: Auth },

      // ── Role-protected: Student ──────────────────────────
      {
        path: "student-dashboard",
        element: (
          <ProtectedRoute requiredRole="student">
            <StudentDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "downloads",
        element: (
          <ProtectedRoute requiredRole="student">
            <StudentDownloads />
          </ProtectedRoute>
        ),
      },
      {
        path: "lesson",
        element: (
          <ProtectedRoute requiredRole="student">
            <Lesson />
          </ProtectedRoute>
        ),
      },
      {
        path: "quiz",
        element: (
          <ProtectedRoute requiredRole="student">
            <Quiz />
          </ProtectedRoute>
        ),
      },

      // ── Role-protected: Teacher ──────────────────────────
      {
        path: "teacher-dashboard",
        element: (
          <ProtectedRoute requiredRole="teacher">
            <TeacherDashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/upload",
        element: (
          <ProtectedRoute requiredRole="teacher">
            <TeacherUploadPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "teacher/course",
        element: (
          <ProtectedRoute requiredRole="teacher">
            <TeacherCourseInsight />
          </ProtectedRoute>
        ),
      },

      // ── Legacy fallback ──────────────────────────────────
      { path: "dashboard", Component: Dashboard },
    ],
  },
]);
