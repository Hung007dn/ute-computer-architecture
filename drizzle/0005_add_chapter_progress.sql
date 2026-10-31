CREATE TABLE `chapter_progress` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`chapter_slug` text NOT NULL,
	`status` text DEFAULT 'NOT_STARTED' NOT NULL,
	`completed_at` integer,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

CREATE UNIQUE INDEX `chapter_progress_user_chapter_idx`
ON `chapter_progress` (`user_id`, `chapter_slug`);
