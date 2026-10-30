import {
  integer,
  real,
  sqliteTable,
  text,
  uniqueIndex,
} from "drizzle-orm/sqlite-core";
const timestamps = {
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
  updatedAt: integer("updated_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
};
export const users = sqliteTable(
  "users",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    name: text("name"),
    role: text("role", { enum: ["STUDENT", "ADMIN"] })
      .notNull()
      .default("STUDENT"),
    passwordHash: text("password_hash"),
    passwordSalt: text("password_salt"),
    mustChangePassword: integer("must_change_password", { mode: "boolean" })
      .notNull()
      .default(true),
    status: text("status", { enum: ["ACTIVE", "BLOCKED"] })
      .notNull()
      .default("ACTIVE"),
    lastLoginAt: integer("last_login_at", { mode: "timestamp" }),
    ...timestamps,
  },
  (t) => [uniqueIndex("users_email_idx").on(t.email)],
);
export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  expiresAt: integer("expires_at", { mode: "timestamp" }).notNull(),
  createdAt: integer("created_at", { mode: "timestamp" })
    .notNull()
    .$defaultFn(() => new Date()),
});
export const courses = sqliteTable("courses", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  ...timestamps,
});
export const chapters = sqliteTable("chapters", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  courseId: integer("course_id")
    .notNull()
    .references(() => courses.id),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  position: integer("position").notNull(),
  ...timestamps,
});
export const lessons = sqliteTable("lessons", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  chapterId: integer("chapter_id")
    .notNull()
    .references(() => chapters.id),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
  videoUrl: text("video_url"),
  position: integer("position").notNull(),
  ...timestamps,
});
export const lessonProgress = sqliteTable(
  "lesson_progress",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    lessonId: integer("lesson_id")
      .notNull()
      .references(() => lessons.id),
    status: text("status", {
      enum: ["NOT_STARTED", "IN_PROGRESS", "COMPLETED"],
    })
      .notNull()
      .default("NOT_STARTED"),
    completedAt: integer("completed_at", { mode: "timestamp" }),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("lesson_progress_user_lesson_idx").on(t.userId, t.lessonId),
  ],
);
export const questions = sqliteTable("questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  chapterId: integer("chapter_id")
    .notNull()
    .references(() => chapters.id),
  lessonId: integer("lesson_id").references(() => lessons.id),
  question: text("question").notNull(),
  type: text("type", {
    enum: ["MULTIPLE_CHOICE", "TRUE_FALSE", "NUMERIC", "SHORT_ANSWER"],
  }).notNull(),
  difficulty: text("difficulty", {
    enum: ["EASY", "MEDIUM", "HARD"],
  }).notNull(),
  correctAnswer: text("correct_answer").notNull(),
  explanation: text("explanation").notNull(),
  source: text("source"),
  year: integer("year"),
  examType: text("exam_type"),
  tags: text("tags"),
  ...timestamps,
});
export const questionOptions = sqliteTable("question_options", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id),
  label: text("label").notNull(),
  content: text("content").notNull(),
  isCorrect: integer("is_correct", { mode: "boolean" })
    .notNull()
    .default(false),
});
export const quizAttempts = sqliteTable("quiz_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  chapterId: integer("chapter_id").references(() => chapters.id),
  mode: text("mode", { enum: ["PRACTICE", "EXAM"] }).notNull(),
  score: real("score"),
  startedAt: integer("started_at", { mode: "timestamp" }).notNull(),
  completedAt: integer("completed_at", { mode: "timestamp" }),
});
export const quizAnswers = sqliteTable("quiz_answers", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  attemptId: integer("attempt_id")
    .notNull()
    .references(() => quizAttempts.id),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id),
  answer: text("answer"),
  isCorrect: integer("is_correct", { mode: "boolean" }),
});
export const exams = sqliteTable("exams", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  examType: text("exam_type", {
    enum: ["MIDTERM", "FINAL", "PRACTICE"],
  }).notNull(),
  year: integer("year"),
  durationMinutes: integer("duration_minutes").notNull(),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});
export const examQuestions = sqliteTable("exam_questions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  examId: integer("exam_id")
    .notNull()
    .references(() => exams.id),
  questionId: integer("question_id")
    .notNull()
    .references(() => questions.id),
  position: integer("position").notNull(),
});
export const examAttempts = sqliteTable("exam_attempts", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  examId: integer("exam_id")
    .notNull()
    .references(() => exams.id),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  score: real("score"),
  weakTopics: text("weak_topics"),
  startedAt: integer("started_at", { mode: "timestamp" }).notNull(),
  submittedAt: integer("submitted_at", { mode: "timestamp" }),
});
export const documents = sqliteTable("documents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  title: text("title").notNull(),
  description: text("description").notNull(),
  year: integer("year"),
  type: text("type").notNull(),
  lecturer: text("lecturer").notNull().default("Kiến thức chung"),
  chapter: text("chapter").notNull().default("Tất cả chương"),
  source: text("source"),
  fileUrl: text("file_url"),
  published: integer("published", { mode: "boolean" }).notNull().default(false),
  ...timestamps,
});
export const videos = sqliteTable("videos", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  chapterId: integer("chapter_id").references(() => chapters.id),
  title: text("title").notNull(),
  youtubeId: text("youtube_id").notNull(),
  description: text("description").notNull(),
  duration: text("duration"),
  language: text("language"),
  ...timestamps,
});
export const flashcards = sqliteTable("flashcards", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  chapterId: integer("chapter_id").references(() => chapters.id),
  front: text("front").notNull(),
  back: text("back").notNull(),
  ...timestamps,
});
export const flashcardProgress = sqliteTable(
  "flashcard_progress",
  {
    id: integer("id").primaryKey({ autoIncrement: true }),
    userId: text("user_id")
      .notNull()
      .references(() => users.id),
    flashcardId: integer("flashcard_id")
      .notNull()
      .references(() => flashcards.id),
    level: integer("level").notNull().default(0),
    nextReviewAt: integer("next_review_at", { mode: "timestamp" }),
    ...timestamps,
  },
  (t) => [
    uniqueIndex("flashcard_progress_user_card_idx").on(t.userId, t.flashcardId),
  ],
);
export const studyPlans = sqliteTable("study_plans", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  examDate: integer("exam_date", { mode: "timestamp" }).notNull(),
  planJson: text("plan_json").notNull(),
  ...timestamps,
});
export const favorites = sqliteTable("favorites", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  entityType: text("entity_type").notNull(),
  entityId: text("entity_id").notNull(),
  ...timestamps,
});
export const notes = sqliteTable("notes", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  lessonId: integer("lesson_id").references(() => lessons.id),
  content: text("content").notNull(),
  ...timestamps,
});
export const feedback = sqliteTable("feedback", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id")
    .notNull()
    .references(() => users.id, { onDelete: "cascade" }),
  category: text("category", {
    enum: ["CONTENT", "TECHNICAL", "SUGGESTION", "OTHER"],
  }).notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  status: text("status", { enum: ["NEW", "READ", "RESOLVED"] })
    .notNull()
    .default("NEW"),
  ...timestamps,
});
