"use client";

import { useEffect, useMemo, useState } from "react";
import {
  BookOpenCheck,
  Clock3,
  FileCheck2,
  PlayCircle,
  ShieldCheck,
  UserRoundCog,
} from "lucide-react";
import { QuizEngine } from "@/components/quiz-engine";
import { finalExams } from "@/data/final-exams";

const examGroups = [...new Set(finalExams.map((exam) => exam.year))]
  .sort((a, b) => b - a)
  .map((year) => ({
    year,
    exams: finalExams.filter((exam) => exam.year === year),
  }));

export default function ExamPage() {
  const [activeExamId, setActiveExamId] = useState<string | null>(null);
  const activeExam = useMemo(
    () => finalExams.find((exam) => exam.id === activeExamId) ?? null,
    [activeExamId],
  );
  const [seconds, setSeconds] = useState(0);

  useEffect(() => {
    if (!activeExam) return;
    setSeconds(activeExam.minutes * 60);
    const timer = window.setInterval(
      () => setSeconds((current) => Math.max(0, current - 1)),
      1000,
    );
    return () => window.clearInterval(timer);
  }, [activeExam]);

  if (activeExam) {
    return (
      <div className="page-container section-space">
        <div className="mb-5 flex flex-wrap items-center justify-between gap-3">
          <div>
            <button
              type="button"
              onClick={() => setActiveExamId(null)}
              className="text-xs font-bold text-muted"
            >
              ← Thoát đề
            </button>
            <h1 className="mt-2 text-xl font-black">{activeExam.title}</h1>
          </div>
          <div className="chip">
            <Clock3 size={13} />
            <b className="mono text-blue-500">
              {String(Math.floor(seconds / 60)).padStart(2, "0")}:
              {String(seconds % 60).padStart(2, "0")}
            </b>
          </div>
        </div>
        <QuizEngine
          key={activeExam.id}
          examMode
          questionSet={activeExam.questions}
        />
      </div>
    );
  }

  return (
    <div className="page-container section-space">
      <div className="grid gap-8 lg:grid-cols-[1fr_350px]">
        <div>
          <span className="eyebrow">Final exam archive</span>
          <h1 className="section-title mt-4">Ngân hàng đề cuối kỳ.</h1>
          <p className="muted-copy mt-4 max-w-2xl">
            Các đề được Admin phân loại theo từng năm từ tài liệu tổng hợp 166
            trang. Mỗi thẻ bên dưới là một đề độc lập; câu hỏi của đề nào chỉ
            xuất hiện trong lượt làm của đề đó.
          </p>
        </div>
        <aside className="panel p-5">
          <div className="flex gap-3">
            <ShieldCheck className="shrink-0 text-emerald-500" />
            <div>
              <strong className="text-sm">Đã nhập đủ số câu</strong>
              <p className="mt-1 text-xs leading-5 text-muted">
                Mỗi đề giữ nguyên số lượng câu theo tài liệu gốc: 24, 36, 42,
                45 hoặc 53 câu. Đáp án chỉ hiển thị sau khi nộp bài.
              </p>
            </div>
          </div>
        </aside>
      </div>

      <div className="mt-7 flex flex-wrap gap-2 text-xs text-muted">
        <span className="chip">
          <BookOpenCheck size={13} /> 11 bộ đề
        </span>
        <span className="chip">
          <FileCheck2 size={13} /> 470 câu theo đề gốc
        </span>
        <span className="chip">
          <UserRoundCog size={13} /> Admin biên soạn
        </span>
      </div>

      <div className="mt-10 space-y-12">
        {examGroups.map((group) => (
          <section key={group.year} aria-labelledby={`exam-year-${group.year}`}>
            <div className="mb-5 flex flex-wrap items-end justify-between gap-3 border-b border-border pb-4">
              <div>
                <span className="eyebrow">Phân loại theo năm</span>
                <h2 id={`exam-year-${group.year}`} className="mt-2 text-3xl font-black tracking-tight">
                  Đề thi năm {group.year}
                </h2>
              </div>
              <span className="chip">{group.exams.length} đề độc lập</span>
            </div>

            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
              {group.exams.map((exam, index) => (
                <article key={exam.id} className="panel overflow-hidden">
                  <div
                    className={`h-2 bg-gradient-to-r ${index % 3 === 0 ? "from-cyan-400 to-blue-500" : index % 3 === 1 ? "from-blue-600 to-violet-500" : "from-violet-500 to-rose-400"}`}
                  />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3">
                      <span className="grid h-11 w-11 place-items-center rounded-xl bg-blue-500/10 text-blue-500">
                        <FileCheck2 size={21} />
                      </span>
                      <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[10px] font-bold text-emerald-600">
                        Admin biên soạn
                      </span>
                    </div>
                    <h3 className="mt-5 text-xl font-black tracking-tight">
                      {exam.title}
                    </h3>
                    <p className="mt-2 min-h-10 text-sm leading-5 text-muted">
                      {exam.subtitle}
                    </p>
                    <div className="my-5 flex flex-wrap gap-2">
                      <span className="chip">Đề riêng · {exam.questions.length} câu</span>
                      <span className="chip">{exam.minutes} phút</span>
                      <span className="chip">Nguồn: trang {exam.sourcePages}</span>
                    </div>
                    <p className="mb-5 text-xs leading-5 text-muted">
                      Thuộc bộ đề năm {group.year}; không trộn câu với các đề khác.
                    </p>
                    <button
                      type="button"
                      onClick={() => setActiveExamId(exam.id)}
                      className="primary-button w-full"
                    >
                      <PlayCircle size={17} /> Làm đề này
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </section>
        ))}
      </div>
    </div>
  );
}
