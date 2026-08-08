import type { shortUrl } from "#/db/schema";

export type ShortUrl = typeof shortUrl.$inferSelect;
export type ShortUrlInsert = typeof shortUrl.$inferInsert;
