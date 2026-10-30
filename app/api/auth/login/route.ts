import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { createSession, normalizeStudentEmail, SESSION_COOKIE, SESSION_MAX_AGE, verifyPassword } from "@/lib/student-auth";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null) as { email?: string; password?: string } | null;
  const email = normalizeStudentEmail(body?.email || "");
  const password = body?.password || "";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !password) return NextResponse.json({ error: "Email hoặc mật khẩu không hợp lệ." }, { status: 400 });

  const [user] = await getDb().select().from(users).where(eq(users.email, email)).limit(1);
  if (!user?.passwordHash || !user.passwordSalt || !(await verifyPassword(password, user.passwordSalt, user.passwordHash))) {
    return NextResponse.json({ error: "Email hoặc mật khẩu không đúng." }, { status: 401 });
  }
  if (user.status === "BLOCKED") return NextResponse.json({ error: "Tài khoản đã bị khóa. Vui lòng liên hệ quản trị viên." }, { status: 403 });

  const { token } = await createSession(user.id);
  await getDb().update(users).set({ lastLoginAt: new Date(), updatedAt: new Date() }).where(eq(users.id, user.id));
  const response = NextResponse.json({ user: { email: user.email, name: user.name, role: user.role, mustChangePassword: user.mustChangePassword } });
  response.cookies.set(SESSION_COOKIE, token, { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: SESSION_MAX_AGE });
  return response;
}
