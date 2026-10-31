import Link from "@/components/safe-link";
import {
  ArrowRight,
  BookOpenCheck,
  BrainCircuit,
  CalendarDays,
  Flame,
  Target,
  Trophy,
} from "lucide-react";
import { chapters } from "@/data/course";
import { redirect } from "next/navigation";
import { getCompletedChapterSlugs } from "@/lib/course-progress";
import { getCurrentUser } from "@/lib/student-auth";

export default async function DashboardPage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login?returnTo=/dashboard");
  if (user.mustChangePassword) redirect("/change-password");
  if (user.role === "ADMIN") redirect("/admin");

  const completedChapters = await getCompletedChapterSlugs(user.id);
  const completedCount = completedChapters.size;
  const courseProgress = Math.round((completedCount / chapters.length) * 100);
  const stats = [
    {
      label: "Tiến độ",
      value: `${courseProgress}%`,
      icon: Target,
      color: "text-blue-500",
    },
    {
      label: "Đã học",
      value: `${completedCount} / ${chapters.length}`,
      icon: BookOpenCheck,
      color: "text-cyan-500",
    },
    {
      label: "Quiz đã làm",
      value: "0",
      icon: BrainCircuit,
      color: "text-violet-500",
    },
    {
      label: "Độ chính xác",
      value: "—",
      icon: Trophy,
      color: "text-amber-500",
    },
    {
      label: "Streak",
      value: "0 ngày",
      icon: Flame,
      color: "text-rose-500",
    },
  ];

  return (
    <div className="page-container section-space">
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <span className="eyebrow">Student dashboard</span>
          <h1 className="section-title mt-4">
            Xin chào, {user.name || "sinh viên"} 👋
          </h1>
          <p className="muted-copy mt-3">Đăng nhập bằng {user.email}.</p>
        </div>
        <Link href="/study-plan" className="secondary-button w-fit">
          <CalendarDays size={16} /> Lập kế hoạch ôn thi
        </Link>
      </div>

      <div className="mt-9 grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {stats.map((stat) => (
          <article
            key={stat.label}
            className="rounded-2xl border border-border bg-surface p-5"
          >
            <stat.icon className={stat.color} size={20} />
            <strong className="mt-6 block text-2xl">{stat.value}</strong>
            <small className="text-muted">{stat.label}</small>
          </article>
        ))}
      </div>

      <div className="mt-6 grid gap-5 lg:grid-cols-[1.3fr_.7fr]">
        <section className="panel p-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-bold">Tiến độ theo chương</h2>
              <p className="text-xs text-muted">
                {completedCount > 0
                  ? `${completedCount}/${chapters.length} chương đã hoàn thành`
                  : "Chưa có chương nào được đánh dấu hoàn thành"}
              </p>
            </div>
            <span className="chip">Học kỳ 1</span>
          </div>
          <div className="mt-6 space-y-4">
            {chapters.map((chapter) => {
              const progress = completedChapters.has(chapter.slug) ? 100 : 0;
              return (
                <div
                  key={chapter.id}
                  className="grid items-center gap-3 sm:grid-cols-[170px_1fr_38px]"
                >
                  <span className="truncate text-xs">{chapter.title}</span>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{ width: `${progress}%` }}
                    />
                  </div>
                  <b className="text-right text-xs text-muted">{progress}%</b>
                </div>
              );
            })}
          </div>
        </section>

        <section className="panel p-6">
          <h2 className="font-bold">Bạn nên ôn lại</h2>
          <p className="mt-1 text-xs text-muted">
            Dựa trên kết quả quiz gần đây
          </p>
          <div className="mt-5 rounded-xl border border-dashed border-border bg-soft p-6 text-center">
            <BrainCircuit className="mx-auto text-violet-500" size={24} />
            <strong className="mt-3 block text-sm">Chưa có dữ liệu quiz</strong>
            <p className="mt-2 text-xs leading-5 text-muted">
              Website hiện chưa lưu kết quả quiz để tạo gợi ý ôn tập cá nhân.
            </p>
          </div>
          <Link href="/practice" className="primary-button mt-5 w-full">
            Mở trang quiz <ArrowRight size={15} />
          </Link>
        </section>
      </div>

      <section className="panel mt-5 p-6">
        <h2 className="font-bold">Lịch sử thi thử</h2>
        <div className="mt-5 rounded-2xl border border-dashed border-border bg-soft p-8 text-center">
          <span className="mx-auto grid h-12 w-12 place-items-center rounded-xl bg-blue-500/10 text-blue-500">
            <Trophy size={21} />
          </span>
          <h3 className="mt-4 font-bold">Chưa có dữ liệu lịch sử thi</h3>
          <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
            Website hiện chưa lưu kết quả thi. Khi tính năng này được kết nối,
            các lần nộp đề thật sẽ xuất hiện tại đây.
          </p>
          <Link href="/exam" className="primary-button mt-5">
            Mở phòng thi thử <ArrowRight size={15} />
          </Link>
        </div>
      </section>
    </div>
  );
}
