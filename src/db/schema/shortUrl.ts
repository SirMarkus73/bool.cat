import { integer, pgTable, text } from "drizzle-orm/pg-core";
import { user } from "./auth";

export const shortUrl = pgTable("short_url", {
	id: integer().primaryKey().notNull().generatedAlwaysAsIdentity(),
	slug: text().notNull().unique(),
	ownerId: text().references(() => user.id, {
		onDelete: "cascade",
		onUpdate: "cascade",
	}), // It can be null if the user is not logged in
	redirectUrl: text().notNull(),
	createdAt: integer().notNull(),
	updatedAt: integer().notNull(),
});
