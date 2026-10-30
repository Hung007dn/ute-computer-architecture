import { redirect } from "next/navigation";
import {
  Database,
  FileQuestion,
  FileText,
  ShieldCheck,
  Video,
} from "lucide-react";
import { AccountManager } from "@/components/account-manager";
import { chapters, questions, resources, videos } from "@/data/course";
import { getCurrentUser } from "@/lib/student-auth";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=/admin");
  if (user.mustChangePassword) redirect("/change-password");
  if (user.role !== "ADMIN") redirect("/dashboard");

  const counts = [
    { label: "Chương", value: chapters.length, icon: Database },
    { label: "Câu hỏi", value: questions.length, icon: FileQuestion },
    { label: "Tài liệu", value: resources.length, icon: FileText },
    { label: "Video", value: videos.length, icon: Video },
  ];

  return (
    <div className="page-container section-space">
      <div className="flex items-center gap-4">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-rose-500/10 text-rose-500">
          <ShieldCheck />
        </span>
        <div>
          <span className="eyebrow">Khu vực quản trị</span>
          <h1 className="mt-2 text-3xl font-black">Trung tâm quản trị</h1>
          <p className="mt-1 text-sm text-muted">
            Đang đăng nhập: {user.email}
          </p>
        </div>
      </div>
      <div className="mt-9 grid gap-3 sm:grid-cols-4">
        {counts.map((c) => (
          <article
            key={c.label}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <c.icon className="text-blue-500" />
            <strong className="mt-5 block text-2xl">{c.value}</strong>
            <small className="text-muted">{c.label}</small>
          </article>
        ))}
      </div>
      <AccountManager />
      <section className="panel mt-5 p-6">
        <h2 className="font-bold">Nội dung gần đây</h2>
        <div className="mt-5 overflow-x-auto">
          <table className="w-full min-w-[600px] text-left text-sm">
            <thead className="text-xs text-muted">
              <tr>
                <th className="pb-3">Tiêu đề</th>
                <th>Loại</th>
                <th>Trạng thái</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {chapters.slice(0, 6).map((c) => (
                <tr key={c.id}>
                  <td className="py-4 font-bold">{c.title}</td>
                  <td>Chương học</td>
                  <td>
                    <span className="chip text-emerald-500">Đã xuất bản</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  );
}
