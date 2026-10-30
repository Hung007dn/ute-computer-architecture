import { redirect } from "next/navigation";
import { KeyRound, Mail, ShieldCheck, UserRound } from "lucide-react";
import Link from "@/components/safe-link";
import { getCurrentUser } from "@/lib/student-auth";

export const dynamic = "force-dynamic";

export default async function AccountPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=/account");
  if (user.mustChangePassword) redirect("/change-password");

  return (
    <div className="page-container section-space">
      <div className="mx-auto max-w-2xl">
        <div className="flex items-center gap-4">
          <span className="grid h-14 w-14 place-items-center rounded-2xl bg-blue-500/10 text-blue-500">
            <UserRound size={25} />
          </span>
          <div>
            <span className="eyebrow">Tài khoản</span>
            <h1 className="mt-2 text-3xl font-black">Thông tin tài khoản</h1>
          </div>
        </div>
        <section className="panel mt-8 overflow-hidden">
          <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
            <div className="rounded-2xl border border-border bg-soft p-4">
              <span className="flex items-center gap-2 text-xs font-bold text-muted">
                <UserRound size={15} /> Họ và tên
              </span>
              <strong className="mt-3 block">
                {user.name || "Chưa cập nhật"}
              </strong>
            </div>
            <div className="rounded-2xl border border-border bg-soft p-4">
              <span className="flex items-center gap-2 text-xs font-bold text-muted">
                <Mail size={15} /> Email đăng nhập
              </span>
              <strong className="mt-3 block break-all">{user.email}</strong>
            </div>
            <div className="rounded-2xl border border-border bg-soft p-4">
              <span className="flex items-center gap-2 text-xs font-bold text-muted">
                <ShieldCheck size={15} /> Loại tài khoản
              </span>
              <strong className="mt-3 block">
                {user.role === "ADMIN" ? "Quản trị viên" : "Sinh viên"}
              </strong>
            </div>
            <div className="rounded-2xl border border-border bg-soft p-4">
              <span className="flex items-center gap-2 text-xs font-bold text-muted">
                <ShieldCheck size={15} /> Trạng thái
              </span>
              <strong className="mt-3 block text-emerald-500">
                Đang hoạt động
              </strong>
            </div>
          </div>
          <div className="flex flex-col gap-4 border-t border-border bg-soft p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
            <div>
              <h2 className="font-bold">Bảo mật tài khoản</h2>
            </div>
            <Link
              href="/change-password?returnTo=/account"
              className="primary-button shrink-0"
            >
              <KeyRound size={16} /> Đổi mật khẩu
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
