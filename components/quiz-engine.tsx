"use client";

import { useMemo, useState } from "react";
import { CheckCircle2, ChevronLeft, ChevronRight, Flag, Lightbulb, RotateCcw, XCircle } from "lucide-react";
import { chapters, questions, type Question } from "@/data/course";

type QuizEngineProps = {
  examMode?: boolean;
  chapterIds?: number[];
  questionCount?: number;
  difficulty?: Question["difficulty"];
  questionSet?: Question[];
};

function orderedQuestions(items: Question[], preferredDifficulty?: Question["difficulty"]) {
  const shuffled = [...items].sort((a, b) => ((a.id * 9301 + 49297) % 233280) - ((b.id * 9301 + 49297) % 233280));
  if (!preferredDifficulty) return shuffled;
  return [...shuffled.filter((item) => item.difficulty === preferredDifficulty), ...shuffled.filter((item) => item.difficulty !== preferredDifficulty)];
}

function buildBalancedPool(chapterIds: number[], count: number, difficulty?: Question["difficulty"]) {
  const groups = chapterIds.map((chapterId) => orderedQuestions(questions.filter((item) => item.chapterId === chapterId), difficulty));
  const positions = groups.map(() => 0);
  const result: Question[] = [];
  while (result.length < count) {
    let added = false;
    groups.forEach((group, groupIndex) => {
      if (result.length >= count) return;
      const item = group[positions[groupIndex]];
      if (item) {
        result.push(item);
        positions[groupIndex] += 1;
        added = true;
      }
    });
    if (!added) break;
  }
  return result;
}

export function QuizEngine({ examMode = false, chapterIds, questionCount, difficulty, questionSet }: QuizEngineProps) {
  const selectedChapterIds = chapterIds?.length
    ? chapterIds
    : questionSet?.length
      ? [...new Set(questionSet.map((item) => item.chapterId))]
      : chapters.map((item) => item.id);
  const targetCount = questionCount ?? (examMode ? 10 : 15);
  const pool = useMemo(
    () => questionSet?.length
      ? questionSet
      : buildBalancedPool(selectedChapterIds, targetCount, difficulty),
    [questionSet, selectedChapterIds.join(","), targetCount, difficulty],
  );
  const [index, setIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [flagged, setFlagged] = useState<number[]>([]);
  const current = pool[index];
  const gradedPool = pool.filter((question) => question.answer >= 0);
  const reviewOnlyCount = pool.length - gradedPool.length;
  const score = gradedPool.filter((question) => answers[question.id] === question.answer).length;
  const choose = (answer: number) => { if (!submitted) setAnswers((currentAnswers) => ({ ...currentAnswers, [current.id]: answer })); };
  const finish = () => setSubmitted(true);
  const reset = () => { setAnswers({}); setSubmitted(false); setIndex(0); setFlagged([]); };

  const chapterResults = selectedChapterIds.map((chapterId) => {
    const chapterQuestions = gradedPool.filter((item) => item.chapterId === chapterId);
    const correct = chapterQuestions.filter((item) => answers[item.id] === item.answer).length;
    return { chapter: chapters.find((item) => item.id === chapterId), total: chapterQuestions.length, correct, percent: chapterQuestions.length ? Math.round(correct / chapterQuestions.length * 100) : 0 };
  }).filter((item) => item.total > 0);
  const weakest = [...chapterResults].sort((a, b) => a.percent - b.percent)[0];

  if (submitted) return <section className="panel overflow-hidden">
    <div className="bg-gradient-to-br from-blue-600 to-cyan-500 p-8 text-center text-white"><small className="font-bold uppercase tracking-widest">Kết quả</small><div className="mt-3 text-6xl font-black">{gradedPool.length ? Math.round(score / gradedPool.length * 10) : 0}<span className="text-2xl">/10</span></div><p className="mt-2">Đúng {score}/{gradedPool.length} câu có đáp án · {gradedPool.length ? Math.round(score / gradedPool.length * 100) : 0}% chính xác</p>{reviewOnlyCount > 0 && <p className="mt-1 text-xs text-white/75">{reviewOnlyCount} câu nguồn không hiện rõ đáp án được giữ để tham khảo và không tính điểm.</p>}</div>
    <div className="p-6"><h3 className="font-bold">Kết quả theo chương</h3><div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">{chapterResults.map((item) => <div key={item.chapter?.id} className={`rounded-xl p-4 ${item.percent >= 70 ? "bg-emerald-500/10" : "bg-rose-500/10"}`}><small className="text-muted">Chương {item.chapter?.id}</small><strong className={`block text-2xl ${item.percent >= 70 ? "text-emerald-500" : "text-rose-500"}`}>{item.percent}%</strong><span className="text-xs text-muted">{item.correct}/{item.total} câu đúng</span></div>)}</div>{weakest && <div className="note mt-5"><Lightbulb /><div><strong>{weakest.percent >= 70 ? "Bạn đang nắm kiến thức khá tốt." : `Bạn nên ôn lại Chương ${weakest.chapter?.id}: ${weakest.chapter?.title}.`}</strong><p>{weakest.percent >= 70 ? "Hãy thử tăng mức độ hoặc số chương để tiếp tục luyện tập." : `Kết quả chương này là ${weakest.correct}/${weakest.total} câu đúng, thấp nhất trong lượt vừa làm.`}</p></div></div>}<button onClick={reset} className="secondary-button mt-3"><RotateCcw size={15} /> Làm lại</button></div>
  </section>;

  const selected = answers[current.id];
  const reviewOnly = current.answer < 0;
  return <section className="panel overflow-hidden">
    <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-4 sm:px-6"><div><small className="text-muted">Câu {index + 1} / {pool.length} · Chương {current.chapterId}</small><div className="mt-2 flex max-w-full flex-wrap gap-1">{pool.map((question, questionIndex) => <button key={question.id} onClick={() => setIndex(questionIndex)} aria-label={`Đến câu ${questionIndex + 1}`} className={`h-1.5 w-5 rounded-full ${answers[question.id] !== undefined ? "bg-cyan-400" : questionIndex === index ? "bg-blue-500" : "bg-soft"}`} />)}</div></div><button onClick={() => setFlagged((currentFlags) => currentFlags.includes(current.id) ? currentFlags.filter((id) => id !== current.id) : [...currentFlags, current.id])} className="secondary-button py-2"><Flag size={14} fill={flagged.includes(current.id) ? "currentColor" : "none"} /> Đánh dấu</button></div>
    <div className="p-5 sm:p-8"><div className="flex items-center gap-2"><span className="chip">{current.difficulty}</span><span className="chip">{reviewOnly ? "Câu tham khảo" : current.tags[0]}</span></div><h2 className="mt-5 whitespace-pre-line text-xl font-bold leading-8 sm:text-2xl">{current.prompt}</h2>{reviewOnly ? <div className="note mt-7"><Lightbulb /><div><strong>Bản nguồn không hiển thị rõ đáp án.</strong><p>Câu này được giữ nguyên để bạn tham khảo nội dung và không được tính vào điểm bài làm.</p></div></div> : <div className="mt-7 grid gap-3 sm:grid-cols-2">{current.options.map((option, optionIndex) => { const isCorrect = optionIndex === current.answer; const chosen = selected === optionIndex; let style = chosen ? "border-blue-500 bg-blue-500/10" : "border-border bg-surface"; if (!examMode && chosen && isCorrect) style = "border-emerald-500 bg-emerald-500/10"; if (!examMode && chosen && !isCorrect) style = "border-rose-500 bg-rose-500/10"; return <button key={`${optionIndex}-${option}`} onClick={() => choose(optionIndex)} className={`flex items-center gap-3 rounded-xl border p-4 text-left text-sm transition hover:border-cyan-400 ${style}`}><span className="mono grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-soft text-xs font-bold">{String.fromCharCode(65 + optionIndex)}</span><span>{option}</span>{!examMode && chosen && (isCorrect ? <CheckCircle2 className="ml-auto shrink-0 text-emerald-500" size={18} /> : <XCircle className="ml-auto shrink-0 text-rose-500" size={18} />)}</button>; })}</div>}{!examMode && !reviewOnly && selected !== undefined && <div className="mt-5 rounded-xl border border-border bg-soft p-4 text-sm"><strong className="flex items-center gap-2"><Lightbulb size={16} className="text-amber-500" /> Giải thích</strong><p className="mt-2 leading-6 text-muted">{current.explanation}</p></div>}</div>
    <div className="flex items-center justify-between border-t border-border bg-soft p-4 sm:px-6"><button disabled={index === 0} onClick={() => setIndex((currentIndex) => currentIndex - 1)} className="secondary-button disabled:opacity-40"><ChevronLeft size={15} /> Trước</button>{index < pool.length - 1 ? <button onClick={() => setIndex((currentIndex) => currentIndex + 1)} className="primary-button">Tiếp theo <ChevronRight size={15} /></button> : <button onClick={finish} className="primary-button">Nộp bài <CheckCircle2 size={15} /></button>}</div>
  </section>;
}
