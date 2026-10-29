"use client";

import { useState } from "react";
import Link from "@/components/safe-link";
import type { Chapter } from "@/data/course";
import { LessonActions } from "@/components/lesson-actions";
import {
  ArrowLeft,
  ArrowRight,
  BookOpen,
  Calculator,
  CheckCircle2,
  Clock3,
  Lightbulb,
  List,
  PlayCircle,
  Target,
} from "lucide-react";

type SectionId = "concepts" | "formula" | "video" | "quiz";

const sections = [
  { id: "concepts" as const, label: "1. Khái niệm cốt lõi", shortLabel: "Khái niệm", icon: CheckCircle2 },
  { id: "formula" as const, label: "2. Công thức và ví dụ", shortLabel: "Công thức", icon: BookOpen },
  { id: "video" as const, label: "Video minh họa", shortLabel: "Video", icon: PlayCircle },
  { id: "quiz" as const, label: "Quiz cuối chương", shortLabel: "Quiz", icon: Calculator },
];

const sidebarDetails: Record<SectionId, { title: string; items: string[] }> = {
  concepts: { title: "Trong phần này", items: ["Ý tưởng cốt lõi", "Mô hình Von Neumann", "Thành phần hệ thống"] },
  formula: { title: "Trong phần này", items: ["Công thức CPU Time", "Ví dụ tính toán", "Cách suy luận"] },
  video: { title: "Video bài học", items: ["Mục tiêu video", "Nội dung minh họa", "Ghi chú khi xem"] },
  quiz: { title: "Kiểm tra kiến thức", items: ["Thông tin bài quiz", "Nội dung kiểm tra", "Bắt đầu làm bài"] },
};

function ArchitectureVisual() {
  return (
    <div className="aspect-video overflow-hidden rounded-2xl bg-slate-950 p-6 text-white sm:p-9">
      <div className="flex items-center justify-between text-[10px] text-slate-400"><span className="mono">ARCHITECTURE VIEW</span><span className="h-2 w-2 animate-pulse rounded-full bg-cyan-400" /></div>
      <div className="mt-8 grid h-[70%] grid-cols-3 gap-3">
        <div className="grid place-items-center rounded-xl border border-cyan-400/40 bg-cyan-400/10"><span className="text-center"><b className="mono block text-cyan-300">CPU</b><small>Control + Datapath</small></span></div>
        <div className="grid place-items-center rounded-xl border border-blue-400/30 bg-blue-400/10"><span className="text-center"><b className="mono block text-blue-300">BUS</b><small>Address · Data</small></span></div>
        <div className="grid place-items-center rounded-xl border border-violet-400/30 bg-violet-400/10"><span className="text-center"><b className="mono block text-violet-300">MEM</b><small>Instructions + Data</small></span></div>
      </div>
    </div>
  );
}

function SectionContent({ active, chapter }: { active: SectionId; chapter: Chapter }) {
  if (active === "concepts") {
    return (
      <div>
        <ArchitectureVisual />
        <section className="prose-area">
          <h2>Ý tưởng cốt lõi</h2>
          <p>Kiến trúc máy tính mô tả những thuộc tính hệ thống mà lập trình viên có thể quan sát: tập lệnh, kiểu dữ liệu, cơ chế định địa chỉ và hành vi vào/ra. Tổ chức máy tính giải thích cách các khối phần cứng phối hợp để hiện thực kiến trúc đó.</p>
          <div className="note"><Lightbulb /><div><strong>Ghi nhớ</strong><p>Architecture trả lời “máy tính làm được gì”, organization trả lời “phần cứng làm điều đó như thế nào”.</p></div></div>
          <h2>Mô hình Von Neumann</h2>
          <p>Lệnh và dữ liệu cùng nằm trong bộ nhớ. CPU lần lượt nạp lệnh, giải mã, thực thi rồi cập nhật trạng thái. Chu kỳ này là nền tảng để hiểu mọi chương tiếp theo.</p>
        </section>
      </div>
    );
  }

  if (active === "formula") {
    return (
      <section className="prose-area rounded-2xl border border-border bg-surface p-6 sm:p-8">
        <span className="eyebrow">Công thức trọng tâm</span>
        <h2 className="mt-5">CPU Time và hiệu năng</h2>
        <p>Thời gian CPU phụ thuộc vào số lệnh của chương trình, số chu kỳ trung bình cho mỗi lệnh và tần số xung nhịp.</p>
        <div className="formula"><small>CPU TIME</small><strong>Instruction Count × CPI / Clock Rate</strong></div>
        <h2>Ví dụ suy luận</h2>
        <p>Với 10⁹ lệnh, CPI trung bình bằng 2 và xung nhịp 2 GHz, thời gian CPU là 1 giây. Công thức cho thấy tăng xung nhịp chưa chắc làm chương trình nhanh nếu CPI hoặc số lệnh tăng.</p>
        <div className="mt-6 grid gap-3 sm:grid-cols-3">
          <div className="rounded-xl bg-soft p-4"><small className="text-muted">Instruction Count</small><strong className="mono mt-2 block">10⁹</strong></div>
          <div className="rounded-xl bg-soft p-4"><small className="text-muted">CPI</small><strong className="mono mt-2 block">2</strong></div>
          <div className="rounded-xl bg-soft p-4"><small className="text-muted">Kết quả</small><strong className="mono mt-2 block text-blue-500">1 giây</strong></div>
        </div>
      </section>
    );
  }

  if (active === "video") {
    return (
      <section className="overflow-hidden rounded-2xl border border-border bg-surface">
        <div className="grid aspect-video place-items-center bg-slate-950 p-8 text-center text-white"><div><span className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-400/25"><PlayCircle size={30} /></span><h2 className="mt-5 text-xl font-bold">Video minh họa: {chapter.title}</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-slate-400">Khu vực video bài giảng của chương. Bạn có thể bổ sung video YouTube hoặc video do giảng viên cung cấp tại đây.</p></div></div>
        <div className="grid gap-4 p-5 sm:grid-cols-2 sm:p-6">
          <div className="flex gap-3"><Clock3 className="shrink-0 text-cyan-500" size={19} /><div><strong className="text-sm">Thời lượng đề xuất</strong><p className="mt-1 text-xs leading-5 text-muted">10–15 phút, tập trung vào sơ đồ và luồng xử lý.</p></div></div>
          <div className="flex gap-3"><Target className="shrink-0 text-blue-500" size={19} /><div><strong className="text-sm">Mục tiêu</strong><p className="mt-1 text-xs leading-5 text-muted">Nắm được các khái niệm chính trước khi làm bài tập.</p></div></div>
        </div>
      </section>
    );
  }

  return (
    <section className="rounded-2xl border border-border bg-surface p-6 sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between"><div><span className="eyebrow">Quiz cuối chương</span><h2 className="mt-4 text-2xl font-black">Kiểm tra kiến thức vừa học</h2><p className="mt-3 max-w-xl text-sm leading-6 text-muted">Hoàn thành {chapter.quizzes} câu hỏi về {chapter.title.toLowerCase()}. Bạn sẽ nhận đáp án và giải thích sau mỗi câu.</p></div><span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-blue-500/10 text-blue-500"><Calculator size={24} /></span></div>
      <div className="my-7 grid gap-3 sm:grid-cols-3">
        <div className="rounded-xl bg-soft p-4"><small className="text-muted">Số câu hỏi</small><strong className="mt-1 block text-lg">{chapter.quizzes} câu</strong></div>
        <div className="rounded-xl bg-soft p-4"><small className="text-muted">Thời gian</small><strong className="mt-1 block text-lg">Không giới hạn</strong></div>
        <div className="rounded-xl bg-soft p-4"><small className="text-muted">Mục tiêu</small><strong className="mt-1 block text-lg">≥ 70%</strong></div>
      </div>
      <Link href="/practice" className="primary-button">Bắt đầu làm Quiz <ArrowRight size={15} /></Link>
    </section>
  );
}

export function LessonContentTabs({ chapter, previousChapter, nextChapter }: { chapter: Chapter; previousChapter: Chapter | null; nextChapter: Chapter | null }) {
  const [active, setActive] = useState<SectionId>("concepts");
  const details = sidebarDetails[active];

  const selectSection = (section: SectionId) => {
    setActive(section);
    window.scrollTo({ top: 64, behavior: "smooth" });
  };

  return (
    <div className="mx-auto grid max-w-[1440px] lg:grid-cols-[260px_minmax(0,1fr)_240px]">
      <aside className="hidden min-h-[calc(100vh-64px)] border-r border-border bg-surface p-5 lg:block">
        <div className="sticky top-24">
          <Link href="/learn" className="mb-6 flex items-center gap-2 text-xs font-bold text-muted"><ArrowLeft size={14} /> Tất cả chương</Link>
          <p className="mb-3 text-[10px] font-bold uppercase tracking-wider text-muted">Nội dung chương</p>
          <nav className="space-y-1" role="tablist" aria-label="Nội dung chương">{sections.map((section) => <button key={section.id} type="button" role="tab" aria-selected={active === section.id} onClick={() => selectSection(section.id)} className={`mobile-link w-full border-0 text-left ${active === section.id ? "bg-soft text-blue-500" : "bg-transparent"}`}><section.icon size={16} />{section.label}</button>)}</nav>
        </div>
      </aside>

      <article className="min-w-0 px-5 py-8 sm:px-10 lg:px-14 lg:py-10">
        <div className="mx-auto max-w-3xl">
          <div className="flex items-center gap-2 text-xs text-muted"><Link href="/learn">Học</Link><span>/</span><span>Chương {chapter.id}</span></div>
          <h1 className="mt-5 text-3xl font-black tracking-tight sm:text-5xl">{chapter.title}</h1>
          <p className="muted-copy mt-4 text-base">{chapter.description}</p>
          <div className="my-7 flex flex-wrap gap-2"><span className="chip">{chapter.lessons} bài học</span><span className="chip">{chapter.exercises} bài tập</span><span className="chip">{chapter.quizzes} câu quiz</span></div>
          <div className="mb-6 grid grid-cols-2 gap-2 lg:hidden" role="tablist" aria-label="Nội dung chương">{sections.map((section) => <button key={section.id} type="button" role="tab" aria-selected={active === section.id} onClick={() => selectSection(section.id)} className={`flex items-center justify-center gap-2 rounded-xl border px-3 py-3 text-xs font-bold ${active === section.id ? "border-blue-500 bg-blue-500/10 text-blue-500" : "border-border bg-surface text-muted"}`}><section.icon size={15} />{section.shortLabel}</button>)}</div>
          <div key={active} role="tabpanel" className="animate-in fade-in duration-300"><SectionContent active={active} chapter={chapter} /></div>
          <div className="mt-10 flex flex-wrap items-center justify-between gap-3 border-t border-border pt-7"><LessonActions slug={chapter.slug} />{active !== "quiz" && <button type="button" onClick={() => selectSection("quiz")} className="secondary-button">Đến phần Quiz <ArrowRight size={15} /></button>}</div>
          <div className="mt-10 grid gap-3 sm:grid-cols-2">{previousChapter ? <Link href={`/learn/${previousChapter.slug}`} className="rounded-xl border border-border bg-surface p-4 text-sm"><small className="text-muted">Bài trước</small><strong className="mt-1 block">← {previousChapter.title}</strong></Link> : <span />}{nextChapter && <Link href={`/learn/${nextChapter.slug}`} className="rounded-xl border border-border bg-surface p-4 text-right text-sm"><small className="text-muted">Bài tiếp theo</small><strong className="mt-1 block">{nextChapter.title} →</strong></Link>}</div>
        </div>
      </article>

      <aside className="hidden border-l border-border bg-surface p-5 xl:block">
        <div className="sticky top-24">
          <div className="mb-5 flex items-center gap-2"><List size={15} /><strong className="text-xs">{details.title}</strong></div>
          {details.items.map((item, index) => <span key={item} className={`block py-2 pl-3 text-xs ${index === 0 ? "border-l-2 border-cyan-400 text-blue-500" : "border-l border-border text-muted"}`}>{item}</span>)}
          {active === "formula" && <div className="mt-8 rounded-xl bg-soft p-4"><small className="font-bold text-muted">CÔNG THỨC</small><div className="mono mt-2 text-xs">T = IC × CPI / f</div></div>}
          <div className="mt-8 rounded-xl border border-border p-4"><small className="font-bold text-muted">TIẾN ĐỘ PHẦN HỌC</small><div className="progress-track mt-3"><div className="progress-fill" style={{ width: `${((sections.findIndex((item) => item.id === active) + 1) / sections.length) * 100}%` }} /></div><p className="mt-2 text-[10px] text-muted">Phần {sections.findIndex((item) => item.id === active) + 1} / {sections.length}</p></div>
        </div>
      </aside>
    </div>
  );
}
