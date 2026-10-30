ALTER TABLE `users` ADD `password_hash` text;
--> statement-breakpoint
ALTER TABLE `users` ADD `password_salt` text;
--> statement-breakpoint
ALTER TABLE `users` ADD `must_change_password` integer DEFAULT true NOT NULL;
--> statement-breakpoint
ALTER TABLE `users` ADD `status` text DEFAULT 'ACTIVE' NOT NULL;
--> statement-breakpoint
ALTER TABLE `users` ADD `last_login_at` integer;
--> statement-breakpoint
CREATE TABLE `sessions` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`expires_at` integer NOT NULL,
	`created_at` integer NOT NULL,
	FOREIGN KEY (`user_id`) REFERENCES `users`(`id`) ON UPDATE no action ON DELETE cascade
);
