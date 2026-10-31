"use client";

import Link from "@/components/safe-link";
import {
  Bot,
  CheckCircle2,
  LoaderCircle,
  MessageCircle,
  Send,
  X,
} from "lucide-react";
import { FormEvent, useEffect, useState } from "react";

export function ContactChatbot({
  isAuthenticated,
}: {
  isAuthenticated: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [text, setText] = useState("");
  const [notice, setNotice] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  useEffect(() => {
    if (!open) return;
    const close = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [open]);

  async function send(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const content = text.trim();
    if (content.length < 10) {
      setNotice({ type: "error", text: "Tin nhắn cần ít nhất 10 ký tự." });
      return;
    }
    setLoading(true);
    setNotice(null);
    const response = await fetch("/api/feedback", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        category: "OTHER",
        subject: "Tin nhắn từ hộp liên hệ",
        message: content,
      }),
    });
    const data = (await response.json()) as { error?: string };
    setLoading(false);
    if (!response.ok) {
      setNotice({
        type: "error",
        text: data.error || "Không thể gửi tin nhắn.",
      });
      return;
    }
    setText("");
    setNotice({ type: "success", text: "Tin nhắn đã được gửi đến Admin." });
  }

  return (
    <>
      {open && (
        <section
          className="fixed bottom-24 right-4 z-[80] flex max-h-[calc(100vh-7rem)] w-[min(380px,calc(100vw-2rem))] flex-col overflow-hidden rounded-3xl border border-border bg-surface shadow-2xl"
          role="dialog"
          aria-modal="false"
          aria-label="Liên hệ Admin"
        >
          <header className="flex items-center justify-between bg-gradient-to-r from-blue-600 to-cyan-500 px-5 py-4 text-white">
            <div className="flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-white/15">
                <Bot size={21} />
              </span>
              <div>
                <strong className="block text-sm">Trợ lý liên hệ</strong>
                <span className="text-xs text-white/80">Kết nối với Admin</span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="grid h-9 w-9 place-items-center rounded-xl hover:bg-white/15"
              aria-label="Đóng chatbot"
            >
              <X size={19} />
            </button>
          </header>
          <div className="overflow-y-auto p-5">
            <div className="max-w-[90%] rounded-2xl rounded-tl-md bg-soft p-4 text-sm leading-6">
              Xin chào! Bạn có thể gửi tin nhắn trực tiếp cho Admin hoặc liên hệ
              qua một trong hai kênh bên dưới.
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a
                href="https://zalo.me/0911112020"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl border border-border p-3 text-xs font-bold transition hover:border-blue-500 hover:bg-blue-500/5"
                aria-label="Liên hệ qua Zalo"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-blue-500 text-[11px] font-black text-white">
                  Zalo
                </span>
                <span>Zalo</span>
              </a>
              <a
                href="https://www.facebook.com/hungtv7/"
                target="_blank"
                rel="noreferrer"
                className="flex flex-col items-center gap-2 rounded-2xl border border-border p-3 text-xs font-bold transition hover:border-blue-600 hover:bg-blue-500/5"
                aria-label="Liên hệ qua Facebook"
              >
                <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#1877F2] text-xl font-black text-white">
                  f
                </span>
                <span>Facebook</span>
              </a>
            </div>
            {isAuthenticated ? (
              <form onSubmit={send} className="mt-4">
                <label
                  htmlFor="admin-chat-message"
                  className="mb-2 block text-xs font-bold"
                >
                  Nhắn trực tiếp cho Admin
                </label>
                <textarea
                  id="admin-chat-message"
                  value={text}
                  onChange={(event) => setText(event.target.value)}
                  minLength={10}
                  maxLength={2000}
                  rows={3}
                  placeholder="Nhập câu hỏi hoặc nội dung cần hỗ trợ..."
                  className="w-full resize-none rounded-2xl border border-border bg-page p-3 text-sm leading-5 outline-none focus:border-blue-500"
                />
                {notice && (
                  <p
                    role="status"
                    className={`mt-2 flex items-start gap-2 rounded-xl p-3 text-xs font-semibold ${notice.type === "success" ? "bg-emerald-500/10 text-emerald-600" : "bg-rose-500/10 text-rose-500"}`}
                  >
                    {notice.type === "success" && (
                      <CheckCircle2 className="shrink-0" size={15} />
                    )}
                    {notice.text}
                  </p>
                )}
                <button
                  disabled={loading}
                  className="primary-button mt-3 w-full disabled:opacity-60"
                >
                  {loading ? (
                    <LoaderCircle className="animate-spin" size={16} />
                  ) : (
                    <Send size={16} />
                  )}
                  {loading ? "Đang gửi..." : "Gửi tin nhắn"}
                </button>
              </form>
            ) : (
              <div className="mt-4 rounded-2xl border border-dashed border-border bg-soft p-4 text-center">
                <p className="text-xs leading-5 text-muted">
                  Đăng nhập để nhắn trực tiếp trong website.
                </p>
                <Link
                  href="/login?returnTo=/"
                  className="secondary-button mt-3 py-2"
                >
                  <span>Đăng nhập</span>
                </Link>
              </div>
            )}
          </div>
        </section>
      )}
      <button
        type="button"
        onClick={() => setOpen((current) => !current)}
        className="fixed bottom-5 right-5 z-[75] grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-blue-600 to-cyan-500 text-white shadow-xl transition hover:-translate-y-0.5 hover:shadow-2xl"
        aria-label={open ? "Đóng chatbot liên hệ" : "Mở chatbot liên hệ"}
        aria-expanded={open}
      >
        {open ? <X size={23} /> : <MessageCircle size={24} />}
      </button>
    </>
  );
}
