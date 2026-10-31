import { and, eq } from "drizzle-orm";
import { getDb } from "@/db";
import { chapterProgress } from "@/db/schema";

export async function getCompletedChapterSlugs(userId?: string | null) {
  if (!userId) return new Set<string>();

  const rows = await getDb()
    .select({ chapterSlug: chapterProgress.chapterSlug })
    .from(chapterProgress)
    .where(
      and(
        eq(chapterProgress.userId, userId),
        eq(chapterProgress.status, "COMPLETED"),
      ),
    );

  return new Set(rows.map((row) => row.chapterSlug));
}
