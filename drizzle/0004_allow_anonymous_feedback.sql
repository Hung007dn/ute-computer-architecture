CREATE TABLE `feedback_anonymous` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text,
	`category` text NOT NULL,
	`subject` text NOT NULL,
	`message` text NOT NULL,
	`status` text DEFAULT 'NEW' NOT NULL,
	`created_at` integer NOT NULL,
	`updated_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);

INSERT INTO `feedback_anonymous` (`id`, `user_id`, `category`, `subject`, `message`, `status`, `created_at`, `updated_at`)
SELECT `id`, `user_id`, `category`, `subject`, `message`, `status`, `created_at`, `updated_at` FROM `feedback`;

DROP TABLE `feedback`;
ALTER TABLE `feedback_anonymous` RENAME TO `feedback`;
