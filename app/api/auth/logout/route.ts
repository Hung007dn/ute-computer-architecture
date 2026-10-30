import { NextResponse } from "next/server";
import { deleteSession, SESSION_COOKIE } from "@/lib/student-auth";

export async function POST(request: Request) {
  const token = request.headers.get("cookie")?.match(/(?:^|;\s*)ute_ca_session=([^;]+)/)?.[1];
  await deleteSession(token);
  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, "", { httpOnly: true, secure: true, sameSite: "lax", path: "/", maxAge: 0 });
  return response;
}
