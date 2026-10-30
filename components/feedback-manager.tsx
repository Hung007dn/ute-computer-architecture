"use client";

import { useEffect, useState } from "react";
import {
  CheckCheck,
  Eye,
  LoaderCircle,
  MessageSquareText,
  RefreshCw,
} from "lucide-react";

type FeedbackItem = {
  id: number;
  category: "CONTENT" | "TECHNICAL" | "SUGGESTION" | "OTHER";
  subject: string;
  message: string;
  status: "NEW" | "READ" | "RESOLVED";
  createdAt: string;
  updatedAt: string;
  userName: string | null;
  userEmail: string;
};

const categoryLabels = {
  CONTENT: "Nội dung",
  TECHNICAL: "Lỗi kỹ thuật",
  SUGGESTION: "Đề xuất",
  OTHER: "Khác",
};

export function FeedbackManager() {
  const [items, setItems] = useState<FeedbackItem[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState("");

  async function load() {
    setLoading(true);
    const response = await fetch("/api/feedback", { cache: "no-store" });
    const data = (await response.json()) as {
      feedback?: FeedbackItem[];
      unreadCount?: number;
      error?: string;
    };
    setLoading(false);
    if (!response.ok) {
      setMessage(data.error || "Không thể tải phản hồi.");
      return;
    }
    setItems(data.feedback || []);
    setUnreadCount(data.unreadCount || 0);
    setMessage("");
  }

  useEffect(() => {
    void load();
  }, []);

  async function update(id: number, status: "READ" | "RESOLVED") {
    setLoading(true);
    const response = await fetch("/api/feedback", {
      method: "PATCH",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setLoading(false);
    if (!response.ok) {
      const data = (await response.json()) as { error?: string };
      setMessage(data.error || "Không thể cập nhật phản hồi.");
      return;
    }
    await load();
  }

  return (
    <section className="panel mt-5 p-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="relative">
            <MessageSquareText className="text-cyan-500" />
            {unreadCount > 0 && (
              <b className="absolute -right-3 -top-3 grid min-h-5 min-w-5 place-items-center rounded-full bg-rose-500 px-1 text-[10px] text-white">
                {unreadCount}
              </b>
            )}
          </span>
          <div>
            <h2 className="font-bold">Ý kiến phản hồi</h2>
            <p className="text-xs text-muted">
              {unreadCount > 0
                ? `${unreadCount} phản hồi mới cần xem`
                : "Không có phản hồi mới"}
            </p>
          </div>
        </div>
        <button
          type="button"
          onClick={load}
          disabled={loading}
          className="secondary-button py-2 disabled:opacity-50"
        >
          {loading ? (
            <LoaderCircle className="animate-spin" size={16} />
          ) : (
            <RefreshCw size={16} />
          )}{" "}
          Làm mới
        </button>
      </div>
      {message && (
        <p className="mt-4 rounded-xl bg-rose-500/10 p-3 text-sm font-semibold text-rose-500">
          {message}
        </p>
      )}
      <div className="mt-5 space-y-3">
        {items.map((item) => (
          <article
            key={item.id}
            className={`rounded-2xl border p-5 ${item.status === "NEW" ? "border-cyan-500/40 bg-cyan-500/5" : "border-border bg-page"}`}
          >
            <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="chip text-cyan-600">
                    {categoryLabels[item.category]}
                  </span>
                  <span
                    className={`chip ${item.status === "RESOLVED" ? "text-emerald-500" : item.status === "NEW" ? "text-rose-500" : "text-blue-500"}`}
                  >
                    {item.status === "NEW"
                      ? "Mới"
                      : item.status === "READ"
                        ? "Đã xem"
                        : "Đã xử lý"}
                  </span>
                </div>
                <h3 className="mt-3 font-bold">{item.subject}</h3>
                <p className="mt-2 whitespace-pre-wrap text-sm leading-6 text-muted">
                  {item.message}
                </p>
                <p className="mt-4 text-xs text-muted">
                  {item.userName || "Sinh viên"} · {item.userEmail} ·{" "}
                  {new Date(item.createdAt).toLocaleString("vi-VN")}
                </p>
              </div>
              {item.status !== "RESOLVED" && (
                <div className="flex shrink-0 flex-wrap gap-2">
                  {item.status === "NEW" && (
                    <button
                      type="button"
                      onClick={() => update(item.id, "READ")}
                      className="secondary-button py-2"
                    >
                      <Eye size={14} /> Đã xem
                    </button>
                  )}
                  <button
                    type="button"
                    onClick={() => update(item.id, "RESOLVED")}
                    className="secondary-button py-2 text-emerald-600"
                  >
                    <CheckCheck size={14} /> Đã xử lý
                  </button>
                </div>
              )}
            </div>
          </article>
        ))}
        {!loading && items.length === 0 && (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
            Chưa có ý kiến phản hồi nào.
          </div>
        )}
      </div>
    </section>
  );
}
