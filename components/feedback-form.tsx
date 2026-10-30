"use client";

import { FormEvent, useState } from "react";
import { CheckCircle2, LoaderCircle, Send } from "lucide-react";

export function FeedbackForm() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formElement = event.currentTarget;
    const form = new FormData(formElement);
    setLoading(true);
    setMessage(null);
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        category: form.get("category"),
        subject: form.get("subject"),
        message: form.get("message"),
      }),
    });
    const data = (await response.json()) as { error?: string };
    setLoading(false);
    if (!response.ok) {
      setMessage({
        type: "error",
        text: data.error || "Không thể gửi phản hồi.",
      });
      return;
    }
    formElement.reset();
    setMessage({
      type: "success",
      text: "Phản hồi đã được gửi đến quản trị viên. Cảm ơn bạn đã đóng góp!",
    });
  }

  return (
    <form onSubmit={submit} className="panel mt-8 space-y-5 p-6 sm:p-8">
      <label className="block">
        <span className="mb-2 block text-xs font-bold">Loại phản hồi</span>
        <select
          name="category"
          required
          defaultValue="SUGGESTION"
          className="h-12 w-full rounded-xl border border-border bg-page px-4 text-sm outline-none focus:border-blue-500"
        >
          <option value="SUGGESTION">Đề xuất cải thiện</option>
          <option value="CONTENT">Nội dung bài học</option>
          <option value="TECHNICAL">Lỗi kỹ thuật</option>
          <option value="OTHER">Vấn đề khác</option>
        </select>
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-bold">Tiêu đề</span>
        <input
          name="subject"
          required
          minLength={5}
          maxLength={120}
          placeholder="Tóm tắt ý kiến của bạn"
          className="h-12 w-full rounded-xl border border-border bg-page px-4 text-sm outline-none focus:border-blue-500"
        />
      </label>
      <label className="block">
        <span className="mb-2 block text-xs font-bold">Nội dung chi tiết</span>
        <textarea
          name="message"
          required
          minLength={10}
          maxLength={2000}
          rows={7}
          placeholder="Mô tả vấn đề hoặc đề xuất để quản trị viên có thể xử lý..."
          className="w-full resize-y rounded-xl border border-border bg-page p-4 text-sm leading-6 outline-none focus:border-blue-500"
        />
        <span className="mt-2 block text-right text-[11px] text-muted">
          Tối đa 2.000 ký tự
        </span>
      </label>
      {message && (
        <p
          role="status"
          className={`flex items-start gap-2 rounded-xl p-3 text-sm font-semibold ${message.type === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-500"}`}
        >
          {message.type === "success" && (
            <CheckCircle2 className="mt-0.5 shrink-0" size={16} />
          )}
          {message.text}
        </p>
      )}
      <button
        disabled={loading}
        className="primary-button w-full disabled:opacity-60"
      >
        {loading ? (
          <LoaderCircle className="animate-spin" size={17} />
        ) : (
          <Send size={17} />
        )}
        {loading ? "Đang gửi..." : "Gửi phản hồi đến Admin"}
      </button>
    </form>
  );
}
