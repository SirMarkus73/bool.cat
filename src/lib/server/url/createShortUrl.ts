import { createServerFn, createServerOnlyFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import z from "zod";
import { db } from "#/db";
import { shortUrl } from "#/db/schema";
import { UNAUTHENTICATED_SHORT_URL_EXPIRATION_HOURS } from "#/lib/constants";
import { isDatabaseError } from "#/lib/isDatabaseError";
import { getSession } from "../auth/session";

const createShortUrlSchema = z.discriminatedUnion("mode", [
	z.object({
		mode: z.literal("guest"),
		longUrl: z.url(),
	}),
	z.object({
		mode: z.literal("user"),
		longUrl: z.url(),
		expirationDate: z.date(),
	}),
]);

const createGuestShortUrl = createServerOnlyFn(
	async (longUrl: string): Promise<string> => {
		const expirationDate = new Date();
		expirationDate.setHours(
			expirationDate.getHours() + UNAUTHENTICATED_SHORT_URL_EXPIRATION_HOURS,
		);
		const retries = 5;

		for (let i = 0; i < retries; i++) {
			const slug = nanoid(6);

			try {
				await db.insert(shortUrl).values({
					slug,
					redirectUrl: longUrl,
					expirationDate,
				});
				return slug;
			} catch (error) {
				if (!isDatabaseError(error)) {
					console.error(`Error creating short URL (attempt ${i + 1}):`, error);
					throw new Error(
						"An unexpected error occurred while creating short URL.",
					);
				}

				if (error.cause.code === "23505") {
					// Unique constraint violation, retry with a new slug
					console.warn(
						`Slug collision detected (attempt ${i + 1}), retrying...`,
					);
				} else {
					console.error(
						`Database error creating short URL (attempt ${i + 1}):`,
						error,
					);
					throw new Error("Database error occurred while creating short URL.");
				}
			}
		}

		throw new Error(
			"Failed to create a unique short URL after multiple attempts.",
		);
	},
);

const createUserShortUrl = createServerOnlyFn(
	async (longUrl: string, expirationDate: Date): Promise<string> => {
		const retries = 5;

		for (let i = 0; i < retries; i++) {
			const slug = nanoid(6);

			try {
				await db.insert(shortUrl).values({
					slug,
					redirectUrl: longUrl,
					expirationDate,
				});
				return slug;
			} catch (error) {
				if (!isDatabaseError(error)) {
					console.error(`Error creating short URL (attempt ${i + 1}):`, error);
					throw new Error(
						"An unexpected error occurred while creating short URL.",
					);
				}

				if (error.cause.code === "23505") {
					// Unique constraint violation, retry with a new slug
					console.warn(
						`Slug collision detected (attempt ${i + 1}), retrying...`,
					);
				} else {
					console.error(
						`Database error creating short URL (attempt ${i + 1}):`,
						error,
					);
					throw new Error("Database error occurred while creating short URL.");
				}
			}
		}

		throw new Error(
			"Failed to create a unique short URL after multiple attempts.",
		);
	},
);

export const createShortUrl = createServerFn({ method: "POST" })
	.validator(createShortUrlSchema)
	.handler(async ({ data }) => {
		const { longUrl, mode } = data;
		const session = await getSession();

		if (mode === "guest") {
			if (session) {
				throw new Error(
					"Authenticated users should use the 'user' mode to create short URLs.",
				);
			}
			const slug = await createGuestShortUrl(longUrl);
			return { slug };
		}

		if (!session) {
			throw new Error(
				"Guest users should use the 'guest' mode to create short URLs.",
			);
		}

		const slug = await createUserShortUrl(longUrl, data.expirationDate);
		return { slug };
	});
