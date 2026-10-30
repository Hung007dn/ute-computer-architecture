"use client";

import { FormEvent, useState } from "react";
import { LockKeyhole, LogIn, Mail } from "lucide-react";

export default function LoginPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError("");
    const form = new FormData(event.currentTarget);
    const response = await fetch("/api/auth/login", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ email: form.get("email"), password: form.get("password") }) });
    const data = await response.json() as { error?: string; user?: { mustChangePassword: boolean } };
    if (!response.ok) { setError(data.error || "Không thể đăng nhập."); setLoading(false); return; }
    const returnTo = new URLSearchParams(window.location.search).get("returnTo");
    window.location.href = data.user?.mustChangePassword ? "/change-password" : returnTo?.startsWith("/") ? returnTo : "/dashboard";
  }

  return <div className="page-container section-space"><div className="mx-auto max-w-md"><div className="text-center"><span className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-blue-500/10 text-blue-500"><LogIn /></span><h1 className="mt-5 text-3xl font-black">Đăng nhập sinh viên</h1><p className="mt-2 text-sm text-muted">Sử dụng email HCMUTE do quản trị viên đã tạo.</p></div><form onSubmit={submit} className="panel mt-8 space-y-5 p-6 sm:p-8"><label className="block"><span className="mb-2 block text-xs font-bold">Email sinh viên</span><div className="flex items-center gap-3 rounded-xl border border-border bg-page px-4 focus-within:border-blue-500"><Mail size={17} className="text-muted"/><input name="email" type="email" required autoComplete="username" placeholder="MSSV@student.hcmute.edu.vn" className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none"/></div></label><label className="block"><span className="mb-2 block text-xs font-bold">Mật khẩu</span><div className="flex items-center gap-3 rounded-xl border border-border bg-page px-4 focus-within:border-blue-500"><LockKeyhole size={17} className="text-muted"/><input name="password" type="password" required autoComplete="current-password" className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none"/></div></label>{error&&<p role="alert" className="rounded-xl bg-rose-500/10 p-3 text-sm font-semibold text-rose-500">{error}</p>}<button disabled={loading} className="primary-button w-full disabled:opacity-60">{loading?"Đang đăng nhập...":"Đăng nhập"}</button><div className="rounded-xl bg-amber-500/10 p-4 text-xs leading-5 text-muted"><b className="text-main">Lần đăng nhập đầu tiên:</b> mật khẩu mặc định là <code className="font-bold text-amber-600">hcmute123</code>. Hệ thống sẽ yêu cầu bạn đổi mật khẩu ngay sau khi đăng nhập.</div></form></div></div>;
}
