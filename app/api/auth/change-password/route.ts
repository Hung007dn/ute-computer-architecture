import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { getDb } from "@/db";
import { users } from "@/db/schema";
import { getCurrentUser, hashPassword, verifyPassword } from "@/lib/student-auth";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();
  if (!currentUser) return NextResponse.json({ error: "Bạn chưa đăng nhập." }, { status: 401 });
  const body = await request.json().catch(() => null) as { currentPassword?: string; newPassword?: string } | null;
  const currentPassword = body?.currentPassword || "";
  const newPassword = body?.newPassword || "";
  if (newPassword.length < 8 || !/[A-Za-z]/.test(newPassword) || !/\d/.test(newPassword)) return NextResponse.json({ error: "Mật khẩu mới phải có ít nhất 8 ký tự, gồm chữ và số." }, { status: 400 });
  if (newPassword === "hcmute123") return NextResponse.json({ error: "Mật khẩu mới không được trùng mật khẩu mặc định." }, { status: 400 });

  const [user] = await getDb().select().from(users).where(eq(users.id, currentUser.id)).limit(1);
  if (!user?.passwordHash || !user.passwordSalt || !(await verifyPassword(currentPassword, user.passwordSalt, user.passwordHash))) return NextResponse.json({ error: "Mật khẩu hiện tại không đúng." }, { status: 401 });
  const password = await hashPassword(newPassword);
  await getDb().update(users).set({ passwordHash: password.hash, passwordSalt: password.salt, mustChangePassword: false, updatedAt: new Date() }).where(eq(users.id, user.id));
  return NextResponse.json({ ok: true });
}
