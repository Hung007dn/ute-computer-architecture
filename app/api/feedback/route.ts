import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { feedback as feedbackRecords, users } from "@/db/schema";
import { getCurrentUser } from "@/lib/student-auth";

export const dynamic = "force-dynamic";

const categories = ["CONTENT", "TECHNICAL", "SUGGESTION", "OTHER"] as const;
const statuses = ["NEW", "READ", "RESOLVED"] as const;

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.mustChangePassword)
    return NextResponse.json(
      { error: "Bạn cần đăng nhập để gửi phản hồi." },
      { status: 401 },
    );

  const body = (await request.json().catch(() => null)) as {
    category?: string;
    subject?: string;
    message?: string;
  } | null;
  const category = body?.category?.trim().toUpperCase();
  const subject = body?.subject?.trim() || "";
  const message = body?.message?.trim() || "";
  if (!categories.includes(category as (typeof categories)[number]))
    return NextResponse.json(
      { error: "Loại phản hồi không hợp lệ." },
      { status: 400 },
    );
  if (subject.length < 5 || subject.length > 120)
    return NextResponse.json(
      { error: "Tiêu đề cần từ 5 đến 120 ký tự." },
      { status: 400 },
    );
  if (message.length < 10 || message.length > 2000)
    return NextResponse.json(
      { error: "Nội dung cần từ 10 đến 2.000 ký tự." },
      { status: 400 },
    );

  const [created] = await getDb()
    .insert(feedbackRecords)
    .values({
      userId: user.id,
      category: category as (typeof categories)[number],
      subject,
      message,
      status: "NEW",
    })
    .returning({
      id: feedbackRecords.id,
      createdAt: feedbackRecords.createdAt,
    });
  return NextResponse.json({ feedback: created }, { status: 201 });
}

export async function GET() {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN" || admin.mustChangePassword)
    return NextResponse.json(
      { error: "Bạn không có quyền quản trị." },
      { status: 403 },
    );

  const rows = await getDb()
    .select({
      id: feedbackRecords.id,
      category: feedbackRecords.category,
      subject: feedbackRecords.subject,
      message: feedbackRecords.message,
      status: feedbackRecords.status,
      createdAt: feedbackRecords.createdAt,
      updatedAt: feedbackRecords.updatedAt,
      userName: users.name,
      userEmail: users.email,
    })
    .from(feedbackRecords)
    .innerJoin(users, eq(feedbackRecords.userId, users.id))
    .orderBy(desc(feedbackRecords.createdAt))
    .limit(100);

  return NextResponse.json(
    {
      feedback: rows,
      unreadCount: rows.filter((item) => item.status === "NEW").length,
    },
    { headers: { "Cache-Control": "no-store, max-age=0" } },
  );
}

export async function PATCH(request: Request) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN" || admin.mustChangePassword)
    return NextResponse.json(
      { error: "Bạn không có quyền quản trị." },
      { status: 403 },
    );
  const body = (await request.json().catch(() => null)) as {
    id?: number;
    status?: string;
  } | null;
  const id = Number(body?.id);
  const status = body?.status?.toUpperCase();
  if (
    !Number.isInteger(id) ||
    id < 1 ||
    !statuses.includes(status as (typeof statuses)[number])
  )
    return NextResponse.json(
      { error: "Yêu cầu không hợp lệ." },
      { status: 400 },
    );

  const [updated] = await getDb()
    .update(feedbackRecords)
    .set({ status: status as (typeof statuses)[number], updatedAt: new Date() })
    .where(eq(feedbackRecords.id, id))
    .returning({ id: feedbackRecords.id });
  if (!updated)
    return NextResponse.json(
      { error: "Không tìm thấy phản hồi." },
      { status: 404 },
    );
  return NextResponse.json({ ok: true });
}
