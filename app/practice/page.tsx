"use client";

import { useState } from "react";
import { BrainCircuit, Check, Settings2, Zap } from "lucide-react";
import { QuizEngine } from "@/components/quiz-engine";
import { chapters, type Question } from "@/data/course";

type DifficultyFilter = Question["difficulty"] | "Trộn mức độ";

export default function PracticePage() {
  const [started, setStarted] = useState(false);
  const [mode, setMode] = useState<"practice" | "exam">("practice");
  const [selectedChapters, setSelectedChapters] = useState<number[]>([1]);
  const [questionCount, setQuestionCount] = useState(15);
  const [difficulty, setDifficulty] = useState<DifficultyFilter>("Trộn mức độ");

  const toggleChapter = (chapterId: number) => {
    setSelectedChapters((current) => current.includes(chapterId)
      ? current.length === 1 ? current : current.filter((id) => id !== chapterId)
      : [...current, chapterId].sort((a, b) => a - b));
  };

  if (started) return <div className="page-container section-space"><button onClick={() => setStarted(false)} className="mb-5 text-xs font-bold text-muted">← Thiết lập lại</button><QuizEngine examMode={mode === "exam"} chapterIds={selectedChapters} questionCount={questionCount} difficulty={difficulty === "Trộn mức độ" ? undefined : difficulty} /></div>;

  return <div className="page-container section-space">
    <div className="mx-auto max-w-3xl text-center"><span className="eyebrow">Quiz theo chương</span><h1 className="section-title mt-4">Luyện đúng phần bạn cần.</h1><p className="muted-copy mt-4">Chọn một hoặc nhiều chương. Câu hỏi được phân bổ đều và không lặp trong cùng lượt luyện.</p></div>
    <div className="panel mx-auto mt-10 max-w-3xl p-6 sm:p-8">
      <div className="mb-6 flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-blue-500/10 text-blue-500"><Settings2 /></span><div><strong>Thiết lập bài luyện</strong><p className="text-xs text-muted">Từ 15 đến 30 câu cho mỗi lượt</p></div></div>

      <div className="mb-3 flex items-center justify-between gap-3"><label className="text-xs font-bold">Chọn chương <span className="font-normal text-muted">({selectedChapters.length} đã chọn)</span></label><button type="button" onClick={() => setSelectedChapters(selectedChapters.length === chapters.length ? [1] : chapters.map((item) => item.id))} className="text-xs font-bold text-blue-500">{selectedChapters.length === chapters.length ? "Chỉ chọn Chương 1" : "Chọn tất cả"}</button></div>
      <div className="grid gap-2 sm:grid-cols-2">{chapters.map((chapter) => { const selected = selectedChapters.includes(chapter.id); return <button type="button" key={chapter.id} onClick={() => toggleChapter(chapter.id)} aria-pressed={selected} className={`flex items-center gap-3 rounded-xl border p-3 text-left transition ${selected ? "border-blue-500 bg-blue-500/10" : "border-border bg-page hover:border-cyan-400"}`}><span className={`grid h-7 w-7 shrink-0 place-items-center rounded-lg border text-[10px] font-black ${selected ? "border-blue-500 bg-blue-500 text-white" : "border-border text-muted"}`}>{selected ? <Check size={14} /> : chapter.id}</span><span className="min-w-0"><b className="block truncate text-xs">Chương {chapter.id}</b><small className="block truncate text-[10px] text-muted">{chapter.title}</small></span></button>})}</div>
      <p className="mt-3 text-xs leading-5 text-muted">Luôn phải chọn ít nhất một chương. Với nhiều chương, hệ thống chia câu hỏi gần đều; phần dư được phân từ chương đầu tiên.</p>

      <div className="mt-6 grid gap-4 sm:grid-cols-2">
        <div><label className="mb-2 block text-xs font-bold">Số câu</label><select value={questionCount} onChange={(event) => setQuestionCount(Number(event.target.value))} className="h-12 w-full rounded-xl border border-border bg-page px-4 text-sm">{[15, 20, 25, 30].map((count) => <option key={count} value={count}>{count} câu</option>)}</select></div>
        <div><label className="mb-2 block text-xs font-bold">Mức độ ưu tiên</label><select value={difficulty} onChange={(event) => setDifficulty(event.target.value as DifficultyFilter)} className="h-12 w-full rounded-xl border border-border bg-page px-4 text-sm"><option>Trộn mức độ</option><option>Dễ</option><option>Trung bình</option><option>Khó</option></select></div>
      </div>

      <div className="mt-6 grid gap-3 sm:grid-cols-2"><button onClick={() => setMode("practice")} className={`rounded-xl border p-4 text-left ${mode === "practice" ? "border-cyan-400 bg-cyan-400/10" : "border-border"}`}><BrainCircuit className="mb-3 text-cyan-500" /><strong className="block text-sm">Practice Mode</strong><small className="text-muted">Xem đáp án và giải thích ngay</small></button><button onClick={() => setMode("exam")} className={`rounded-xl border p-4 text-left ${mode === "exam" ? "border-blue-500 bg-blue-500/10" : "border-border"}`}><Zap className="mb-3 text-blue-500" /><strong className="block text-sm">Exam Mode</strong><small className="text-muted">Chỉ chấm sau khi nộp</small></button></div>
      <div className="mt-7 rounded-xl bg-soft p-4 text-xs text-muted"><b className="text-main">Bài luyện sắp tạo:</b> {questionCount} câu · {selectedChapters.length} chương · {difficulty} · {mode === "practice" ? "Practice Mode" : "Exam Mode"}</div>
      <button onClick={() => setStarted(true)} className="primary-button mt-4 w-full">Bắt đầu luyện tập</button>
    </div>
  </div>;
}
