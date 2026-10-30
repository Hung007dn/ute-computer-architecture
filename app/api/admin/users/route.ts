import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { DEFAULT_STUDENT_PASSWORD, getCurrentUser, hashPassword, isStudentEmail, normalizeStudentEmail } from "@/lib/student-auth";

export const dynamic = "force-dynamic";

async function authorized() {
  const user = await getCurrentUser();
  return Boolean(user && user.role === "ADMIN" && !user.mustChangePassword);
}

export async function GET() {
  if (!(await authorized())) return NextResponse.json({ error: "Bạn không có quyền quản trị." }, { status: 403 });
  const rows = await getDb().select({ id: users.id, email: users.email, name: users.name, role: users.role, status: users.status, mustChangePassword: users.mustChangePassword, lastLoginAt: users.lastLoginAt, createdAt: users.createdAt }).from(users).orderBy(desc(users.createdAt));
  return NextResponse.json({ users: rows }, { headers: { "Cache-Control": "no-store, max-age=0" } });
}

export async function POST(request: Request) {
  if (!(await authorized())) return NextResponse.json({ error: "Bạn không có quyền quản trị." }, { status: 403 });
  const body = await request.json().catch(() => null) as { email?: string; name?: string } | null;
  const email = normalizeStudentEmail(body?.email || "");
  const name = body?.name?.trim().slice(0, 100) || null;
  if (!isStudentEmail(email)) return NextResponse.json({ error: "Email phải có dạng MSSV@student.hcmute.edu.vn." }, { status: 400 });
  const [existing] = await getDb().select({ id: users.id }).from(users).where(eq(users.email, email)).limit(1);
  if (existing) return NextResponse.json({ error: "Email này đã có tài khoản." }, { status: 409 });
  const password = await hashPassword(DEFAULT_STUDENT_PASSWORD);
  try {
    const [created] = await getDb().insert(users).values({ id: crypto.randomUUID(), email, name, role: "STUDENT", passwordHash: password.hash, passwordSalt: password.salt, mustChangePassword: true, status: "ACTIVE" }).returning({ id: users.id, email: users.email, name: users.name });
    return NextResponse.json({ user: created }, { status: 201 });
  } catch (error) {
    console.error("Student account creation failed", error);
    return NextResponse.json({ error: "Không thể tạo tài khoản. Vui lòng thử lại." }, { status: 500 });
  }
}

export async function PATCH(request: Request) {
  const admin = await getCurrentUser();
  if (!admin || admin.role !== "ADMIN" || admin.mustChangePassword) return NextResponse.json({ error: "Bạn không có quyền quản trị." }, { status: 403 });
  const body = await request.json().catch(() => null) as { id?: string; action?: "RESET_PASSWORD" | "BLOCK" | "UNBLOCK" } | null;
  if (!body?.id || !body.action) return NextResponse.json({ error: "Yêu cầu không hợp lệ." }, { status: 400 });
  if (body.id === admin.id) return NextResponse.json({ error: "Không thể khóa hoặc đặt lại chính tài khoản Admin đang sử dụng." }, { status: 400 });
  const [target] = await getDb().select({ role: users.role }).from(users).where(eq(users.id, body.id)).limit(1);
  if (!target) return NextResponse.json({ error: "Không tìm thấy tài khoản." }, { status: 404 });
  if (target.role === "ADMIN") return NextResponse.json({ error: "Không thể thay đổi tài khoản Admin tại đây." }, { status: 400 });
  if (body.action === "RESET_PASSWORD") {
    const password = await hashPassword(DEFAULT_STUDENT_PASSWORD);
    await getDb().update(users).set({ passwordHash: password.hash, passwordSalt: password.salt, mustChangePassword: true, updatedAt: new Date() }).where(eq(users.id, body.id));
  } else {
    await getDb().update(users).set({ status: body.action === "BLOCK" ? "BLOCKED" : "ACTIVE", updatedAt: new Date() }).where(eq(users.id, body.id));
  }
  return NextResponse.json({ ok: true });
}
