import Link from "@/components/safe-link";
import {
  ArrowRight,
  BookOpenCheck,
  CheckCircle2,
  Circle,
  Clock3,
  Layers3,
} from "lucide-react";
import { chapters } from "@/data/course";
import { getCompletedChapterSlugs } from "@/lib/course-progress";
import { getCurrentUser } from "@/lib/student-auth";

export const metadata = { title: "Lộ trình học" };

export default async function LearnPage() {
  const user = await getCurrentUser();
  const completedChapters = await getCompletedChapterSlugs(user?.id);
  const completedCount = completedChapters.size;
  const courseProgress = Math.round((completedCount / chapters.length) * 100);

  return (
    <div className="page-container section-space">
      <div className="grid gap-7 lg:grid-cols-[1fr_320px]">
        <div>
          <span className="eyebrow">Learning path</span>
          <h1 className="section-title mt-4">
            Học theo từng chương,
            <br />
            vững từng nền tảng.
          </h1>
          <p className="muted-copy mt-4 max-w-2xl">
            10 module được sắp xếp theo trình tự kiến thức của môn Kiến trúc và
            tổ chức máy tính.
          </p>
        </div>
        <aside className="panel p-5">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-500">
              <BookOpenCheck />
            </span>
            <div>
              <small className="text-muted">Tiến độ khóa học</small>
              <strong className="block text-2xl">{courseProgress}%</strong>
            </div>
          </div>
          <div className="progress-track mt-5">
            <div
              className="progress-fill"
              style={{ width: `${courseProgress}%` }}
            />
          </div>
          <p className="mt-3 text-xs text-muted">
            {completedCount}/{chapters.length} chương đã hoàn thành
          </p>
        </aside>
      </div>

      <div className="mt-12 space-y-3">
        {chapters.map((chapter) => {
          const completed = completedChapters.has(chapter.slug);
          const progress = completed ? 100 : 0;
          return (
            <Link
              href={`/learn/${chapter.slug}`}
              key={chapter.id}
              className="group grid items-center gap-5 rounded-2xl border border-border bg-surface p-5 transition hover:border-cyan-400 hover:shadow-lg md:grid-cols-[54px_1fr_auto]"
            >
              <span className="mono grid h-12 w-12 place-items-center rounded-xl bg-soft text-xs font-bold text-blue-500">
                {String(chapter.id).padStart(2, "0")}
              </span>
              <div>
                <div className="flex items-center gap-2">
                  <h2 className="font-bold tracking-tight">{chapter.title}</h2>
                  {completed ? (
                    <CheckCircle2 size={15} className="text-emerald-500" />
                  ) : (
                    <Circle size={15} className="text-muted" />
                  )}
                </div>
                <p className="mt-1 text-xs leading-5 text-muted">
                  {chapter.description}
                </p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <span className="chip">
                    <Layers3 size={11} /> {chapter.lessons} phần học
                  </span>
                  <span className="chip">{chapter.exercises} bài tập</span>
                  <span className="chip">{chapter.quizzes} quiz</span>
                </div>
              </div>
              <div className="min-w-32">
                <div className="mb-2 flex justify-between text-[10px] text-muted">
                  <span>Tiến độ</span>
                  <b>{progress}%</b>
                </div>
                <div className="progress-track">
                  <div
                    className="progress-fill"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <span className="mt-3 flex items-center justify-end gap-1 text-xs font-bold text-blue-500 opacity-0 transition group-hover:opacity-100">
                  Mở chương <ArrowRight size={14} />
                </span>
              </div>
            </Link>
          );
        })}
      </div>
      <div className="mt-10 flex items-center justify-center gap-2 text-xs text-muted">
        <Clock3 size={14} /> Tổng thời lượng dự kiến: 24 giờ
      </div>
    </div>
  );
}
