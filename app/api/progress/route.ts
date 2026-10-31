import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";
import { chapters } from "@/data/course";
import { getDb } from "@/db";
import { chapterProgress } from "@/db/schema";
import { getCurrentUser } from "@/lib/student-auth";

const payloadSchema = z.object({
  chapterSlug: z.string().min(1),
  status: z.enum(["NOT_STARTED", "COMPLETED"]),
});

export async function POST(request: Request) {
  const user = await getCurrentUser();
  if (!user || user.mustChangePassword)
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const parsed = payloadSchema.safeParse(await request.json());
  if (
    !parsed.success ||
    !chapters.some((chapter) => chapter.slug === parsed.data.chapterSlug)
  )
    return NextResponse.json({ error: "INVALID_INPUT" }, { status: 400 });

  const completed = parsed.data.status === "COMPLETED";
  await getDb()
    .insert(chapterProgress)
    .values({
      userId: user.id,
      chapterSlug: parsed.data.chapterSlug,
      status: parsed.data.status,
      completedAt: completed ? new Date() : null,
    })
    .onConflictDoUpdate({
      target: [chapterProgress.userId, chapterProgress.chapterSlug],
      set: {
        status: parsed.data.status,
        completedAt: completed ? new Date() : null,
        updatedAt: new Date(),
      },
    });

  return NextResponse.json({ ok: true, completed });
}

export async function GET() {
  const user = await getCurrentUser();
  if (!user)
    return NextResponse.json({ error: "UNAUTHORIZED" }, { status: 401 });

  const progress = await getDb()
    .select()
    .from(chapterProgress)
    .where(eq(chapterProgress.userId, user.id));
  return NextResponse.json({ progress });
}
