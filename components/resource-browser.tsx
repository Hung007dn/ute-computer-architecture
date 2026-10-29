"use client";

import { FormEvent, useCallback, useEffect, useRef, useState } from "react";
import { CheckCircle2, ExternalLink, FileText, LoaderCircle, PlayCircle, UploadCloud } from "lucide-react";
import { chapters, resources, videos } from "@/data/course";

type UploadedDocument = {
  id: number;
  title: string;
  description: string;
  year: number | null;
  type: string;
  lecturer: string;
  chapter: string;
  source: string | null;
  createdAt: string;
  downloadUrl: string;
};

const categories = ["Slide", "Bài tập", "Đề thi", "Tóm tắt", "Tài liệu"];
const lecturers = [
  { value: "Kiến thức chung", label: "Kiến thức chung" },
  { value: "Đinh Công Đoan", label: "GV. Đinh Công Đoan" },
  { value: "Võ Lê Phúc Hậu", label: "GV. Võ Lê Phúc Hậu" },
];
const chapterOptions = ["Tất cả chương", ...chapters.map(chapter => chapter.title)];

function DocumentUploader({ onUploaded }: { onUploaded: (document: UploadedDocument) => void }) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setUploading(true);
    setMessage(null);
    const form = event.currentTarget;
    const body = new FormData(form);
    const adminKey = String(body.get("adminKey") || "");
    body.delete("adminKey");

    try {
      const response = await fetch("/api/documents", { method: "POST", body, headers: { "x-admin-upload-key": adminKey } });
      const result = await response.json() as { document?: UploadedDocument; error?: string };
      if (!response.ok || !result.document) throw new Error(result.error || "Không thể tải tài liệu lên.");
      onUploaded(result.document);
      form.reset();
      setMessage({ type: "success", text: "Tài liệu đã được tải lên và thêm vào thư viện." });
    } catch (error) {
      setMessage({ type: "error", text: error instanceof Error ? error.message : "Có lỗi xảy ra khi tải file." });
    } finally {
      setUploading(false);
    }
  }

  return <section className="mb-10 overflow-hidden rounded-2xl border border-cyan-400/30 bg-surface shadow-sm">
    <div className="flex items-start gap-4 border-b border-border bg-cyan-500/5 p-5 sm:p-7">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-cyan-500/15 text-cyan-500"><UploadCloud /></span>
      <div><span className="eyebrow">Document upload</span><h2 className="mt-2 text-xl font-black">Tải tài liệu lên thư viện</h2><p className="muted-copy mt-1 text-sm">Hỗ trợ PDF và DOCX, tối đa 20 MB mỗi file.</p></div>
    </div>
    <form onSubmit={submit} className="grid gap-4 p-5 sm:grid-cols-2 sm:p-7">
      <label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold">Tên tài liệu</span><input name="title" required maxLength={160} className="h-12 w-full rounded-xl border border-border bg-page px-4 text-sm outline-none focus:border-cyan-400" placeholder="Ví dụ: Slide chương 1 – Tổng quan" /></label>
      <label><span className="mb-2 block text-xs font-bold">Phân loại</span><select name="type" className="h-12 w-full rounded-xl border border-border bg-page px-4 text-sm outline-none focus:border-cyan-400">{categories.map(item => <option key={item}>{item}</option>)}</select></label>
      <label><span className="mb-2 block text-xs font-bold">Nhóm giảng viên</span><select name="lecturer" required className="h-12 w-full rounded-xl border border-border bg-page px-4 text-sm outline-none focus:border-cyan-400">{lecturers.map(item => <option key={item.value} value={item.value}>{item.label}</option>)}</select></label>
      <label><span className="mb-2 block text-xs font-bold">Chương</span><select name="chapter" required className="h-12 w-full rounded-xl border border-border bg-page px-4 text-sm outline-none focus:border-cyan-400">{chapterOptions.map(item => <option key={item}>{item}</option>)}</select></label>
      <label><span className="mb-2 block text-xs font-bold">Chọn file</span><input ref={fileRef} name="file" type="file" required accept=".pdf,.docx,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document" className="block h-12 w-full cursor-pointer rounded-xl border border-border bg-page text-sm file:mr-3 file:h-full file:border-0 file:border-r file:border-border file:bg-soft file:px-4 file:font-bold" /></label>
      <label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold">Mật khẩu quản trị</span><input name="adminKey" type="password" required autoComplete="current-password" className="h-12 w-full rounded-xl border border-border bg-page px-4 text-sm outline-none focus:border-cyan-400" placeholder="Nhập mật khẩu để tải tài liệu" /></label>
      <label className="sm:col-span-2"><span className="mb-2 block text-xs font-bold">Mô tả <span className="font-normal text-muted">(không bắt buộc)</span></span><textarea name="description" maxLength={500} rows={3} className="w-full rounded-xl border border-border bg-page p-4 text-sm outline-none focus:border-cyan-400" placeholder="Nội dung chính hoặc ghi chú về tài liệu" /></label>
      <div className="flex flex-wrap items-center gap-3 sm:col-span-2"><button disabled={uploading} className="primary-button disabled:cursor-not-allowed disabled:opacity-60" type="submit">{uploading ? <><LoaderCircle size={16} className="animate-spin" />Đang tải lên...</> : <><UploadCloud size={16} />Tải tài liệu lên</>}</button>{message && <p role="status" className={`text-sm font-semibold ${message.type === "success" ? "text-emerald-500" : "text-rose-500"}`}>{message.text}</p>}</div>
    </form>
  </section>;
}

export function ResourceBrowser({ kind }: { kind: "documents" | "videos" }) {
  const [filter, setFilter] = useState("Tất cả");
  const [lecturerFilter, setLecturerFilter] = useState("Kiến thức chung");
  const [chapterFilter, setChapterFilter] = useState("Tất cả chương");
  const [done, setDone] = useState<number[]>([]);
  const [uploaded, setUploaded] = useState<UploadedDocument[]>([]);
  const [loading, setLoading] = useState(kind === "documents");
  const [loadError, setLoadError] = useState("");

  const loadDocuments = useCallback(async () => {
    if (kind !== "documents") return;
    try {
      const response = await fetch("/api/documents", { cache: "no-store" });
      const result = await response.json() as { documents?: UploadedDocument[]; error?: string };
      if (!response.ok) throw new Error(result.error || "Không thể tải thư viện tài liệu.");
      setUploaded(result.documents || []);
    } catch (error) {
      setLoadError(error instanceof Error ? error.message : "Không thể tải thư viện tài liệu.");
    } finally {
      setLoading(false);
    }
  }, [kind]);

  useEffect(() => { void loadDocuments(); }, [loadDocuments]);

  if (kind === "videos") {
    const types = ["Tất cả", "Tiếng Việt", "English"];
    const visible = videos.filter(item => filter === "Tất cả" || item.language === filter);
    return <><div className="mb-7 flex flex-wrap gap-2">{types.map(type => <button key={type} onClick={() => setFilter(type)} className={filter === type ? "primary-button py-2" : "secondary-button py-2"}>{type}</button>)}</div><div className="grid gap-4 md:grid-cols-2">{visible.map((item, index) => <article key={item.title} className="rounded-2xl border border-border bg-surface p-5"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-500"><PlayCircle /></span><div><small className="text-muted">{item.chapter} · {item.duration}</small><h2 className="mt-1 font-bold leading-6">{item.title}</h2></div></div><button onClick={() => setDone(current => current.includes(index) ? current.filter(item => item !== index) : [...current, index])} className="secondary-button mt-5 w-full py-2">{done.includes(index) ? <><CheckCircle2 size={15} className="text-emerald-500" />Đã đánh dấu</> : "Đánh dấu đã xem"}</button></article>)}</div></>;
  }

  const types = ["Tất cả", ...categories];
  const visibleUploaded = uploaded.filter(item =>
    (lecturerFilter === "Tất cả" || item.lecturer === lecturerFilter)
    && (chapterFilter === "Tất cả chương" || item.chapter === chapterFilter)
    && (filter === "Tất cả" || item.type === filter)
  );
  const visibleSamples = lecturerFilter !== "Kiến thức chung" || chapterFilter !== "Tất cả chương"
    ? []
    : resources.filter(item => filter === "Tất cả" || item.type === filter);

  return <>
    <DocumentUploader onUploaded={document => setUploaded(current => [document, ...current])} />
    <section className="mb-5 rounded-2xl border border-border bg-surface p-4 sm:p-5">
      <p className="mb-3 text-xs font-black uppercase tracking-wider text-muted">Chọn tài liệu theo giảng viên</p>
      <div className="flex flex-wrap gap-2">{[{ value: "Tất cả", label: "Tất cả" }, ...lecturers].map(item => <button key={item.value} onClick={() => { setLecturerFilter(item.value); setChapterFilter("Tất cả chương"); }} className={lecturerFilter === item.value ? "primary-button py-2" : "secondary-button py-2"}>{item.label}</button>)}</div>
      <label className="mt-4 block max-w-md"><span className="mb-2 block text-xs font-bold">Lọc theo chương</span><select value={chapterFilter} onChange={event => setChapterFilter(event.target.value)} className="h-11 w-full rounded-xl border border-border bg-page px-4 text-sm outline-none focus:border-cyan-400">{chapterOptions.map(item => <option key={item}>{item}</option>)}</select></label>
    </section>
    <div className="mb-7 flex flex-wrap gap-2">{types.map(type => <button key={type} onClick={() => setFilter(type)} className={filter === type ? "primary-button py-2" : "secondary-button py-2"}>{type}</button>)}</div>
    {loadError && <p className="mb-5 rounded-xl bg-rose-500/10 p-4 text-sm text-rose-500">{loadError}</p>}
    {loading ? <div className="flex items-center gap-2 py-8 text-sm text-muted"><LoaderCircle size={18} className="animate-spin" />Đang tải thư viện...</div> : <div className="grid gap-4 md:grid-cols-2">
      {visibleUploaded.map(item => <article key={`uploaded-${item.id}`} className="rounded-2xl border border-cyan-400/25 bg-surface p-5"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-cyan-500/10 text-cyan-500"><FileText /></span><div className="min-w-0"><div className="flex flex-wrap gap-2 text-xs"><span className="rounded-full bg-cyan-500/10 px-2 py-1 font-bold text-cyan-600">{item.lecturer === "Kiến thức chung" ? item.lecturer : `GV. ${item.lecturer}`}</span><span className="rounded-full bg-blue-500/10 px-2 py-1 text-blue-600">{item.chapter}</span></div><small className="mt-2 block text-muted">{item.type} · {item.year || "Mới"}</small><h2 className="mt-1 font-bold leading-6">{item.title}</h2>{item.description && <p className="mt-2 text-sm text-muted">{item.description}</p>}</div></div><a href={item.downloadUrl} target="_blank" rel="noreferrer" className="primary-button mt-5 w-full py-2">Mở / tải xuống <ExternalLink size={15} /></a></article>)}
      {visibleSamples.map(item => <article key={`sample-${item.title}`} className="rounded-2xl border border-border bg-surface p-5 opacity-75"><div className="flex items-start gap-4"><span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-blue-500/10 text-blue-500"><FileText /></span><div><small className="text-muted">{item.type} · {item.year}</small><h2 className="mt-1 font-bold leading-6">{item.title}</h2><p className="mt-2 text-xs text-muted">Tài liệu mẫu · chưa có file đính kèm</p></div></div></article>)}
      {!visibleUploaded.length && !visibleSamples.length && <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted md:col-span-2">Chưa có tài liệu trong mục này.</div>}
    </div>}
  </>;
}
