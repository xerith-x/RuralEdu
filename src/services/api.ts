// ─────────────────────────────────────────────────────────
// RuralEdu — API Service Layer
// All functions currently return mock data.
// To connect to a real backend, replace the mock block with:
//   return axiosInstance.post/get(ENDPOINT, payload).then(r => r.data)
// ─────────────────────────────────────────────────────────

import axios from "axios";

// Base URL — set VITE_API_URL in .env when backend is ready
const BASE_URL = import.meta.env.VITE_API_URL || "https://api.ruraledu.app/v1";

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Attach auth token to every request automatically
axiosInstance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// ── TYPES ────────────────────────────────────────────────

export interface LoginCredentials {
  email: string;
  password: string;
  role: "student" | "teacher";
}

export interface AuthResponse {
  token: string;
  user: {
    id: string;
    name: string;
    role: "student" | "teacher";
    email: string;
  };
}

export interface TeacherAnalytics {
  totalStudents: number;
  totalDownloads: number;
  activeCourses: number;
  avgCompletion: number; // percentage 0-100
  recentUploads: {
    id: string;
    title: string;
    subject: string;
    uploadedAt: string;
    downloads: number;
  }[];
}

export interface Course {
  id: string;
  title: string;
  subject: string;
  description: string;
  totalLessons: number;
  completedLessons: number;
  duration: string;
  isDownloaded: boolean;
  progress: number; // 0-100
}

// ── AUTH ─────────────────────────────────────────────────

/**
 * loginUser — authenticates a user by email, password, and role.
 * TODO: replace mock with →
 *   return axiosInstance.post<AuthResponse>("/auth/login", credentials).then(r => r.data);
 */
export async function loginUser(credentials: LoginCredentials): Promise<AuthResponse> {
  // Simulate network latency
  await new Promise((r) => setTimeout(r, 800));

  // Mock response map by role
  const mockData: Record<"student" | "teacher", AuthResponse> = {
    student: {
      token: "mock-student-jwt-token",
      user: {
        id: "s-001",
        name: "Aarav Sharma",
        role: "student",
        email: credentials.email,
      },
    },
    teacher: {
      token: "mock-teacher-jwt-token",
      user: {
        id: "t-001",
        name: "Dr. Meera Patel",
        role: "teacher",
        email: credentials.email,
      },
    },
  };

  return mockData[credentials.role];
}

// ── TEACHER ──────────────────────────────────────────────

/**
 * getTeacherAnalytics — fetches stats and recent uploads for the teacher dashboard.
 * TODO: replace mock with →
 *   return axiosInstance.get<TeacherAnalytics>(`/teacher/${teacherId}/analytics`).then(r => r.data);
 */
export async function getTeacherAnalytics(_teacherId: string): Promise<TeacherAnalytics> {
  await new Promise((r) => setTimeout(r, 500));

  return {
    totalStudents: 148,
    totalDownloads: 1023,
    activeCourses: 6,
    avgCompletion: 67,
    recentUploads: [
      {
        id: "u-1",
        title: "Algebra Basics – Chapter 4",
        subject: "Mathematics",
        uploadedAt: "2026-03-11",
        downloads: 43,
      },
      {
        id: "u-2",
        title: "Reading Comprehension Vol. 2",
        subject: "English",
        uploadedAt: "2026-03-09",
        downloads: 81,
      },
      {
        id: "u-3",
        title: "Digital Safety & Privacy",
        subject: "Digital Literacy",
        uploadedAt: "2026-03-07",
        downloads: 29,
      },
      {
        id: "u-4",
        title: "Fractions & Decimals",
        subject: "Mathematics",
        uploadedAt: "2026-03-05",
        downloads: 57,
      },
    ],
  };
}

// ── STUDENT ──────────────────────────────────────────────

/**
 * getStudentCourses — fetches enrolled courses with progress and offline flags.
 * TODO: replace mock with →
 *   return axiosInstance.get<Course[]>(`/student/${studentId}/courses`).then(r => r.data);
 */
export async function getStudentCourses(_studentId: string): Promise<Course[]> {
  await new Promise((r) => setTimeout(r, 500));

  return [
    {
      id: "c-1",
      title: "Basic Computer Skills",
      subject: "Digital Literacy",
      description: "Keyboard, mouse, files, and basic software operations.",
      totalLessons: 12,
      completedLessons: 9,
      duration: "4 hrs",
      isDownloaded: true,
      progress: 75,
    },
    {
      id: "c-2",
      title: "English Communication",
      subject: "English",
      description: "Reading, writing, and speaking skills for everyday use.",
      totalLessons: 18,
      completedLessons: 5,
      duration: "6 hrs",
      isDownloaded: false,
      progress: 28,
    },
    {
      id: "c-3",
      title: "Digital Mathematics",
      subject: "Mathematics",
      description: "Arithmetic, algebra, and geometry with interactive lessons.",
      totalLessons: 15,
      completedLessons: 0,
      duration: "5 hrs",
      isDownloaded: true,
      progress: 0,
    },
    {
      id: "c-4",
      title: "Environmental Science",
      subject: "Science",
      description: "Explore ecosystems, climate, and conservation locally.",
      totalLessons: 10,
      completedLessons: 10,
      duration: "3 hrs",
      isDownloaded: false,
      progress: 100,
    },
  ];
}
