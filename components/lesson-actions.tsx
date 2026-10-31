"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { CheckCircle2, LoaderCircle } from "lucide-react";

export function LessonActions({
  slug,
  initialCompleted,
  isAuthenticated,
}: {
  slug: string;
  initialCompleted: boolean;
  isAuthenticated: boolean;
}) {
  const router = useRouter();
  const [done, setDone] = useState(initialCompleted);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function toggle() {
    if (!isAuthenticated) {
      window.location.href = `/login?returnTo=${encodeURIComponent(`/learn/${slug}`)}`;
      return;
    }

    setLoading(true);
    setError("");
    const next = !done;
    const response = await fetch("/api/progress", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        chapterSlug: slug,
        status: next ? "COMPLETED" : "NOT_STARTED",
      }),
    });
    setLoading(false);

    if (response.status === 401) {
      window.location.href = `/login?returnTo=${encodeURIComponent(`/learn/${slug}`)}`;
      return;
    }
    if (!response.ok) {
      setError("Không thể cập nhật tiến độ. Vui lòng thử lại.");
      return;
    }

    setDone(next);
    router.refresh();
  }

  return (
    <div>
      <button
        type="button"
        onClick={toggle}
        disabled={loading}
        className={done ? "secondary-button" : "primary-button"}
      >
        {loading ? (
          <LoaderCircle className="animate-spin" size={16} />
        ) : (
          <CheckCircle2 size={16} />
        )}
        {loading
          ? "Đang cập nhật..."
          : done
            ? "Đã hoàn thành"
            : "Hoàn thành bài học"}
      </button>
      {error && (
        <p className="mt-2 text-xs font-semibold text-rose-500">{error}</p>
      )}
    </div>
  );
}
