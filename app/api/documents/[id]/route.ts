import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getChatGPTUser } from "@/app/chatgpt-auth";
import { getDb } from "@/db";
import { documents } from "@/db/schema";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const user = await getChatGPTUser();
  if (!user) return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });
  if (!env.BUCKET) return NextResponse.json({ error: "Kho lưu trữ chưa được cấu hình." }, { status: 503 });

  const { id } = await params;
  const documentId = Number(id);
  if (!Number.isInteger(documentId) || documentId < 1) return NextResponse.json({ error: "INVALID_DOCUMENT" }, { status: 400 });

  const db = getDb();
  const [record] = await db.select().from(documents).where(and(eq(documents.id, documentId), eq(documents.published, true))).limit(1);
  if (!record?.fileUrl) return NextResponse.json({ error: "DOCUMENT_NOT_FOUND" }, { status: 404 });

  const object = await env.BUCKET.get(record.fileUrl);
  if (!object) return NextResponse.json({ error: "FILE_NOT_FOUND" }, { status: 404 });

  const originalName = object.customMetadata?.originalName || `${record.title}.pdf`;
  const contentType = object.httpMetadata?.contentType || "application/octet-stream";
  const disposition = contentType === "application/pdf" ? "inline" : "attachment";
  const headers = new Headers({
    "Content-Type": contentType,
    "Content-Disposition": `${disposition}; filename*=UTF-8''${encodeURIComponent(originalName)}`,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  });
  if (object.etag) headers.set("ETag", object.etag);

  return new Response(object.body, { headers });
}
