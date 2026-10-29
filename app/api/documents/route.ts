import { env } from "cloudflare:workers";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { documents } from "@/db/schema";

const MAX_FILE_SIZE = 20 * 1024 * 1024;
const allowedTypes = new Map([
  ["application/pdf", "pdf"],
  ["application/vnd.openxmlformats-officedocument.wordprocessingml.document", "docx"],
]);
const allowedLecturers = new Set(["Kiến thức chung", "Đinh Công Đoan", "Võ Lê Phúc Hậu"]);

function safeFileName(value: string) {
  return value.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/-+/g, "-").replace(/^-|-$/g, "").slice(-120) || "document";
}

export async function GET() {
  const db = getDb();
  const rows = await db.select({
    id: documents.id,
    title: documents.title,
    description: documents.description,
    year: documents.year,
    type: documents.type,
    lecturer: documents.lecturer,
    chapter: documents.chapter,
    source: documents.source,
    createdAt: documents.createdAt,
  }).from(documents).where(eq(documents.published, true)).orderBy(desc(documents.createdAt));

  return NextResponse.json({
    documents: rows.map((item) => ({ ...item, downloadUrl: `/api/documents/${item.id}` })),
  });
}

export async function POST(request: Request) {
  if (!env.ADMIN_UPLOAD_KEY) return NextResponse.json({ error: "Mật khẩu quản trị chưa được cấu hình." }, { status: 503 });
  if (request.headers.get("x-admin-upload-key") !== env.ADMIN_UPLOAD_KEY) return NextResponse.json({ error: "Mật khẩu quản trị không đúng." }, { status: 401 });
  if (!env.DOCUMENTS) return NextResponse.json({ error: "Kho lưu trữ chưa được cấu hình." }, { status: 503 });

  const form = await request.formData();
  const file = form.get("file");
  const titleValue = form.get("title");
  const typeValue = form.get("type");
  const lecturerValue = form.get("lecturer");
  const chapterValue = form.get("chapter");
  const descriptionValue = form.get("description");

  if (!(file instanceof File)) return NextResponse.json({ error: "Vui lòng chọn một file PDF hoặc DOCX." }, { status: 400 });
  const extension = file.name.split(".").pop()?.toLowerCase();
  const expectedExtension = allowedTypes.get(file.type);
  if (!expectedExtension || extension !== expectedExtension) {
    return NextResponse.json({ error: "Chỉ chấp nhận file PDF hoặc DOCX hợp lệ." }, { status: 400 });
  }
  if (file.size === 0 || file.size > MAX_FILE_SIZE) {
    return NextResponse.json({ error: "File phải có dung lượng từ 1 byte đến 20 MB." }, { status: 400 });
  }

  const title = String(titleValue || file.name.replace(/\.[^.]+$/, "")).trim().slice(0, 160);
  const type = String(typeValue || "Tài liệu").trim().slice(0, 40);
  const lecturer = String(lecturerValue || "Kiến thức chung").trim();
  const chapter = String(chapterValue || "Tất cả chương").trim().slice(0, 120);
  const description = String(descriptionValue || "Tài liệu học tập do quản trị viên tải lên.").trim().slice(0, 500);
  if (!title) return NextResponse.json({ error: "Tên tài liệu không được để trống." }, { status: 400 });
  if (!allowedLecturers.has(lecturer)) return NextResponse.json({ error: "Giảng viên không hợp lệ." }, { status: 400 });
  if (!chapter) return NextResponse.json({ error: "Vui lòng chọn chương cho tài liệu." }, { status: 400 });

  const key = `documents/${crypto.randomUUID()}-${safeFileName(file.name)}`;
  await env.DOCUMENTS.put(key, await file.arrayBuffer(), {
    metadata: { originalName: file.name, contentType: file.type },
  });

  try {
    const db = getDb();
    const [created] = await db.insert(documents).values({
      title,
      description,
      year: new Date().getFullYear(),
      type,
      lecturer,
      chapter,
      source: lecturer === "Kiến thức chung" ? "HCMUTE Learning Lab" : `GV. ${lecturer}`,
      fileUrl: key,
      published: true,
    }).returning({ id: documents.id, title: documents.title, description: documents.description, year: documents.year, type: documents.type, lecturer: documents.lecturer, chapter: documents.chapter, source: documents.source, createdAt: documents.createdAt });

    return NextResponse.json({ document: { ...created, downloadUrl: `/api/documents/${created.id}` } }, { status: 201 });
  } catch (error) {
    await env.DOCUMENTS.delete(key);
    console.error("Document metadata insert failed", error);
    return NextResponse.json({ error: "Không thể lưu thông tin tài liệu. Vui lòng thử lại." }, { status: 500 });
  }
}
