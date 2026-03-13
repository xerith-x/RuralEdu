import { useState } from "react";
import { useNavigate } from "react-router";
import { ArrowLeft, Upload, FileText, PlusCircle, Trash2, CheckCircle } from "lucide-react";

const SUBJECTS = ["Mathematics", "English", "Digital Literacy", "Science", "Social Studies", "Hindi"];

interface Chapter {
  id: number;
  title: string;
  duration: string;
}

export function TeacherUploadPage() {
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [dragOver, setDragOver] = useState(false);
  const [fileName, setFileName] = useState<string | null>(null);
  const [chapters, setChapters] = useState<Chapter[]>([
    { id: 1, title: "", duration: "" },
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  function addChapter() {
    setChapters((prev) => [...prev, { id: prev.length + 1, title: "", duration: "" }]);
  }

  function removeChapter(id: number) {
    setChapters((prev) => prev.filter((c) => c.id !== id));
  }

  function updateChapter(id: number, field: "title" | "duration", value: string) {
    setChapters((prev) => prev.map((c) => (c.id === id ? { ...c, [field]: value } : c)));
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragOver(false);
    const file = e.dataTransfer.files[0];
    if (file) setFileName(file.name);
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) setFileName(file.name);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setIsLoading(true);
    // TODO: POST to /api/teacher/courses with form data
    await new Promise((r) => setTimeout(r, 1000));

    // Store a lightweight record so it appears in the teacher dashboard history
    try {
      const storedRaw = localStorage.getItem("teacherUploads") || "[]";
      const stored = JSON.parse(storedRaw) as {
        id: string;
        title: string;
        subject: string;
        uploadedAt: string;
        downloads: number;
      }[];
      const newUpload = {
        id: `local-${Date.now()}`,
        title: title || "Untitled course",
        subject: subject || "General",
        uploadedAt: new Date().toISOString().slice(0, 10),
        downloads: 0,
      };
      localStorage.setItem("teacherUploads", JSON.stringify([newUpload, ...(Array.isArray(stored) ? stored : [])]));
    } catch {
      // ignore storage errors in demo mode
    }

    setIsLoading(false);
    setSubmitted(true);
  }

  const inputBase: React.CSSProperties = {
    width: "100%",
    padding: "10px 14px",
    borderRadius: "9px",
    border: "1.5px solid #e0e7ff",
    outline: "none",
    fontSize: "0.9rem",
    color: "#1e1b4b",
    backgroundColor: "#fafafa",
    boxSizing: "border-box",
    transition: "border 0.15s",
  };

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center px-6" style={{ backgroundColor: "#f0f9ff" }}>
        <div
          className="text-center p-12 rounded-2xl"
          style={{ backgroundColor: "white", border: "1px solid #e0e7ff", maxWidth: "460px", width: "100%" }}
        >
          <div
            className="flex items-center justify-center w-20 h-20 rounded-full mx-auto mb-5"
            style={{ backgroundColor: "#eef2ff", border: "2px solid #c7d2fe" }}
          >
            <CheckCircle size={36} color="#4f46e5" />
          </div>
          <h2 style={{ fontFamily: "'Poppins', sans-serif", fontWeight: 800, fontSize: "1.5rem", color: "#1e1b4b", marginBottom: "8px" }}>
            Course Uploaded!
          </h2>
          <p style={{ color: "#64748b", fontSize: "0.9rem", marginBottom: "28px" }}>
            "{title}" has been submitted for review and will be live shortly.
          </p>
          <div className="flex gap-3">
            <button
              onClick={() => { setSubmitted(false); setTitle(""); setSubject(""); setDescription(""); setFileName(null); setChapters([{ id: 1, title: "", duration: "" }]); }}
              style={{ flex: 1, padding: "10px", borderRadius: "9px", border: "1.5px solid #e0e7ff", backgroundColor: "white", color: "#475569", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#f8fafc")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "white")}
            >
              Upload Another
            </button>
            <button
              onClick={() => navigate("/teacher-dashboard")}
              style={{ flex: 1, padding: "10px", borderRadius: "9px", border: "none", backgroundColor: "#4f46e5", color: "white", fontWeight: 600, cursor: "pointer", fontSize: "0.875rem" }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#4338ca")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#4f46e5")}
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen px-6 py-10" style={{ backgroundColor: "#f0f9ff" }}>
      <div className="max-w-2xl mx-auto">

        {/* Back */}
        <button
          onClick={() => navigate("/teacher-dashboard")}
          className="flex items-center gap-2 mb-6"
          style={{ background: "none", border: "none", cursor: "pointer", color: "#475569", fontWeight: 500, fontSize: "0.9rem", padding: 0 }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "#4f46e5")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "#475569")}
        >
          <ArrowLeft size={16} /> Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-7">
          <h1 style={{ fontFamily: "'Poppins', sans-serif", fontSize: "1.6rem", fontWeight: 800, color: "#1e1b4b", margin: 0 }}>
            Upload New Content
          </h1>
          <p style={{ color: "#64748b", fontSize: "0.875rem", marginTop: "4px" }}>
            Fill in the details below to publish a course for your students.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Card 1 – Course Info */}
          <div
            className="p-6 rounded-2xl mb-5"
            style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
          >
            <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "0.95rem", marginBottom: "16px" }}>
              Course Details
            </h2>

            <div className="mb-4">
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                Course Title *
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Introduction to Fractions"
                required
                style={inputBase}
                onFocus={(e) => (e.currentTarget.style.border = "1.5px solid #4f46e5")}
                onBlur={(e) => (e.currentTarget.style.border = "1.5px solid #e0e7ff")}
              />
            </div>

            <div className="mb-4">
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                Subject *
              </label>
              <select
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
                style={{ ...inputBase, cursor: "pointer" }}
                onFocus={(e) => (e.currentTarget.style.border = "1.5px solid #4f46e5")}
                onBlur={(e) => (e.currentTarget.style.border = "1.5px solid #e0e7ff")}
              >
                <option value="">Select a subject…</option>
                {SUBJECTS.map((s) => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#374151", marginBottom: "6px" }}>
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Briefly describe what students will learn…"
                rows={3}
                style={{ ...inputBase, resize: "vertical" }}
                onFocus={(e) => (e.currentTarget.style.border = "1.5px solid #4f46e5")}
                onBlur={(e) => (e.currentTarget.style.border = "1.5px solid #e0e7ff")}
              />
            </div>
          </div>

          {/* Card 2 – File Upload */}
          <div
            className="p-6 rounded-2xl mb-5"
            style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
          >
            <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "0.95rem", marginBottom: "16px" }}>
              Course File
            </h2>

            <label
              onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
              onDragLeave={() => setDragOver(false)}
              onDrop={handleDrop}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                gap: "10px",
                padding: "32px",
                borderRadius: "12px",
                border: `2px dashed ${dragOver ? "#4f46e5" : "#c7d2fe"}`,
                backgroundColor: dragOver ? "#eef2ff" : "#fafafe",
                cursor: "pointer",
                transition: "all 0.15s",
              }}
            >
              <input type="file" className="hidden" onChange={handleFileChange} accept=".pdf,.mp4,.zip" />
              {fileName ? (
                <>
                  <FileText size={32} color="#4f46e5" />
                  <p style={{ fontWeight: 600, color: "#4f46e5", fontSize: "0.9rem" }}>{fileName}</p>
                  <p style={{ fontSize: "0.775rem", color: "#94a3b8" }}>Click to change file</p>
                </>
              ) : (
                <>
                  <Upload size={32} color="#a5b4fc" />
                  <p style={{ fontWeight: 600, color: "#475569", fontSize: "0.9rem" }}>Drag & drop or click to upload</p>
                  <p style={{ fontSize: "0.775rem", color: "#94a3b8" }}>PDF, MP4, or ZIP — max 500MB</p>
                </>
              )}
            </label>
          </div>

          {/* Card 3 – Chapters */}
          <div
            className="p-6 rounded-2xl mb-6"
            style={{ backgroundColor: "white", border: "1px solid #e0e7ff" }}
          >
            <div className="flex items-center justify-between mb-4">
              <h2 style={{ fontWeight: 700, color: "#1e1b4b", fontSize: "0.95rem" }}>
                Chapters / Lessons
              </h2>
              <button
                type="button"
                onClick={addChapter}
                className="flex items-center gap-1.5"
                style={{ background: "none", border: "none", cursor: "pointer", color: "#4f46e5", fontWeight: 600, fontSize: "0.825rem", padding: 0 }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#4338ca")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#4f46e5")}
              >
                <PlusCircle size={15} /> Add Chapter
              </button>
            </div>

            <div className="flex flex-col gap-3">
              {chapters.map((ch, i) => (
                <div key={ch.id} className="flex items-center gap-3">
                  <span style={{ fontSize: "0.8rem", fontWeight: 700, color: "#94a3b8", minWidth: "20px" }}>
                    {i + 1}.
                  </span>
                  <input
                    type="text"
                    value={ch.title}
                    onChange={(e) => updateChapter(ch.id, "title", e.target.value)}
                    placeholder="Chapter title"
                    style={{ ...inputBase, flex: 2 }}
                    onFocus={(e) => (e.currentTarget.style.border = "1.5px solid #4f46e5")}
                    onBlur={(e) => (e.currentTarget.style.border = "1.5px solid #e0e7ff")}
                  />
                  <input
                    type="text"
                    value={ch.duration}
                    onChange={(e) => updateChapter(ch.id, "duration", e.target.value)}
                    placeholder="e.g. 12 min"
                    style={{ ...inputBase, flex: 1 }}
                    onFocus={(e) => (e.currentTarget.style.border = "1.5px solid #4f46e5")}
                    onBlur={(e) => (e.currentTarget.style.border = "1.5px solid #e0e7ff")}
                  />
                  {chapters.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeChapter(ch.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", color: "#fca5a5", padding: "4px", flexShrink: 0 }}
                      onMouseEnter={(e) => (e.currentTarget.style.color = "#ef4444")}
                      onMouseLeave={(e) => (e.currentTarget.style.color = "#fca5a5")}
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isLoading}
            className="flex items-center justify-center gap-2 w-full py-3 rounded-xl font-semibold transition-colors"
            style={{
              backgroundColor: isLoading ? "#818cf8" : "#4f46e5",
              color: "white",
              border: "none",
              cursor: isLoading ? "not-allowed" : "pointer",
              fontSize: "0.95rem",
            }}
            onMouseEnter={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = "#4338ca"; }}
            onMouseLeave={(e) => { if (!isLoading) e.currentTarget.style.backgroundColor = "#4f46e5"; }}
          >
            {isLoading ? (
              <>
                <span style={{ display: "inline-block", width: "15px", height: "15px", border: "2px solid rgba(255,255,255,0.35)", borderTopColor: "white", borderRadius: "50%", animation: "spin 0.65s linear infinite" }} />
                Uploading…
              </>
            ) : (
              <><Upload size={16} /> Publish Course</>
            )}
          </button>
        </form>
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
