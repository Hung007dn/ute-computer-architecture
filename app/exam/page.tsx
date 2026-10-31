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
            11 bộ đề được Admin phân loại từ tài liệu tổng hợp 166 trang. Câu
            hỏi đã được chuẩn hóa, sửa lỗi đáp án và sắp xếp thành các lượt
            luyện riêng.
          </p>
        </div>
        <aside className="panel p-5">
          <div className="flex gap-3">
            <ShieldCheck className="shrink-0 text-emerald-500" />
            <div>
              <strong className="text-sm">Đề luyện đã kiểm tra</strong>
              <p className="mt-1 text-xs leading-5 text-muted">
                Đáp án được ẩn đến khi nộp. Nội dung nguồn có lỗi đã được hiệu
                chỉnh trước khi đưa vào hệ thống.
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
          <FileCheck2 size={13} /> 2017–2019
        </span>
        <span className="chip">
          <UserRoundCog size={13} /> Admin biên soạn
        </span>
      </div>

      <div className="mt-8 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {finalExams.map((exam, index) => (
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
              <h2 className="mt-5 text-xl font-black tracking-tight">
                {exam.title}
              </h2>
              <p className="mt-2 min-h-10 text-sm leading-5 text-muted">
                {exam.subtitle}
              </p>
              <div className="my-5 flex flex-wrap gap-2">
                <span className="chip">{exam.questions.length} câu luyện</span>
                <span className="chip">{exam.minutes} phút</span>
                <span className="chip">Nguồn: trang {exam.sourcePages}</span>
              </div>
              <p className="mb-5 text-xs leading-5 text-muted">
                Chọn lọc từ {exam.sourceQuestionCount} câu của bộ đề gốc năm {exam.year}.
              </p>
              <button
                type="button"
                onClick={() => setActiveExamId(exam.id)}
                className="primary-button w-full"
              >
                <PlayCircle size={17} /> Bắt đầu làm đề
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
