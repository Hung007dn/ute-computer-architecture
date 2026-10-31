import { notFound } from "next/navigation";
import { chapters } from "@/data/course";
import { LessonContentTabs } from "@/components/lesson-content-tabs";
import { getCompletedChapterSlugs } from "@/lib/course-progress";
import { getCurrentUser } from "@/lib/student-auth";

export function generateStaticParams() {
  return chapters.map((chapter) => ({ slug: chapter.slug }));
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const chapter = chapters.find((item) => item.slug === slug);
  if (!chapter) notFound();

  const user = await getCurrentUser();
  const completedChapters = await getCompletedChapterSlugs(user?.id);
  const index = chapters.indexOf(chapter);
  return (
    <LessonContentTabs
      chapter={chapter}
      previousChapter={chapters[index - 1] ?? null}
      nextChapter={chapters[index + 1] ?? null}
      initialCompleted={completedChapters.has(chapter.slug)}
      isAuthenticated={Boolean(user && !user.mustChangePassword)}
    />
  );
}
