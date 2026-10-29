import { env } from "cloudflare:workers";
import { and, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { documents } from "@/db/schema";

type DocumentMetadata = { originalName?: string; contentType?: string };

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  if (!env.DOCUMENTS) return NextResponse.json({ error: "Kho lưu trữ chưa được cấu hình." }, { status: 503 });

  const { id } = await params;
  const documentId = Number(id);
  if (!Number.isInteger(documentId) || documentId < 1) return NextResponse.json({ error: "INVALID_DOCUMENT" }, { status: 400 });

  const db = getDb();
  const [record] = await db.select().from(documents).where(and(eq(documents.id, documentId), eq(documents.published, true))).limit(1);
  if (!record?.fileUrl) return NextResponse.json({ error: "DOCUMENT_NOT_FOUND" }, { status: 404 });

  const object = await env.DOCUMENTS.getWithMetadata<DocumentMetadata>(record.fileUrl, "arrayBuffer");
  if (!object.value) return NextResponse.json({ error: "FILE_NOT_FOUND" }, { status: 404 });

  const originalName = object.metadata?.originalName || `${record.title}.pdf`;
  const contentType = object.metadata?.contentType || "application/octet-stream";
  const disposition = contentType === "application/pdf" ? "inline" : "attachment";
  const headers = new Headers({
    "Content-Type": contentType,
    "Content-Disposition": `${disposition}; filename*=UTF-8''${encodeURIComponent(originalName)}`,
    "Cache-Control": "private, no-store",
    "X-Content-Type-Options": "nosniff",
  });
  return new Response(object.value, { headers });
}
