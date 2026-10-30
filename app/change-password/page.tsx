"use client";

import { FormEvent, useState } from "react";
import { ShieldCheck } from "lucide-react";
import { PasswordField } from "@/components/password-field";

export default function ChangePasswordPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "error" | "success";
    text: string;
  } | null>(null);
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const next = String(form.get("newPassword") || "");
    if (next !== form.get("confirmPassword")) {
      setMessage({ type: "error", text: "Mật khẩu xác nhận không khớp." });
      return;
    }
    setLoading(true);
    setMessage(null);
    const response = await fetch("/api/auth/change-password", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        currentPassword: form.get("currentPassword"),
        newPassword: next,
      }),
    });
    const data = (await response.json()) as {
      error?: string;
      role?: "STUDENT" | "ADMIN";
    };
    if (!response.ok) {
      setMessage({
        type: "error",
        text: data.error || "Không thể đổi mật khẩu.",
      });
      setLoading(false);
      return;
    }
    setMessage({
      type: "success",
      text: "Đổi mật khẩu thành công. Đang chuyển trang...",
    });
    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    window.setTimeout(() => {
      window.location.href =
        returnTo === "/account"
          ? "/account"
          : data.role === "ADMIN"
            ? "/admin"
            : "/dashboard";
    }, 800);
  }
  return (
    <div className="page-container section-space">
      <div className="mx-auto max-w-md">
        <div className="text-center">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-emerald-500/10 text-emerald-500">
            <ShieldCheck />
          </span>
          <h1 className="mt-5 text-3xl font-black">Đổi mật khẩu</h1>
          <p className="mt-2 text-sm text-muted">
            Cập nhật mật khẩu để bảo vệ tài khoản của bạn.
          </p>
        </div>
        <form onSubmit={submit} className="panel mt-8 space-y-4 p-6 sm:p-8">
          <PasswordField
            name="currentPassword"
            label="Mật khẩu hiện tại"
            autoComplete="current-password"
          />
          <PasswordField
            name="newPassword"
            label="Mật khẩu mới"
            autoComplete="new-password"
          />
          <PasswordField
            name="confirmPassword"
            label="Nhập lại mật khẩu mới"
            autoComplete="new-password"
          />
          <p className="text-xs leading-5 text-muted">
            Mật khẩu mới cần ít nhất 8 ký tự, có cả chữ và số, đồng thời không
            được trùng mật khẩu mặc định.
          </p>
          {message && (
            <p
              role="status"
              className={`rounded-xl p-3 text-sm font-semibold ${message.type === "success" ? "bg-emerald-500/10 text-emerald-500" : "bg-rose-500/10 text-rose-500"}`}
            >
              {message.text}
            </p>
          )}
          <button
            disabled={loading}
            className="primary-button w-full disabled:opacity-60"
          >
            {loading ? "Đang cập nhật..." : "Lưu mật khẩu mới"}
          </button>
        </form>
      </div>
    </div>
  );
}
