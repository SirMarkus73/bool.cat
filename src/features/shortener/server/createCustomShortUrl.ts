import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "#/db";
import { shortUrl } from "#/db/schema";
import { withAuthContext } from "#/features/auth/server/middleware";
import { slugify } from "#/features/shortener/lib/slugify";
import type { ApiResponse } from "#/interfaces/api";

const validator = z.object({
	slug: z.string().min(1).max(40),
	targetUrl: z.url(),
	expirationDate: z.date(),
});

export const createCustomShortUrl = createServerFn({
	method: "POST",
})
	.middleware([withAuthContext])
	.validator(validator)
	.handler(
		async ({
			context,
			data: { expirationDate, slug, targetUrl },
		}): Promise<ApiResponse<null>> => {
			if (!context.auth.success) return context.auth;

			const { user } = context.auth.data;

			try {
				await db.insert(shortUrl).values({
					expirationDate,
					slug: slugify(slug),
					redirectUrl: targetUrl,
					ownerId: user.id,
				});

				return { success: true, data: null };
			} catch {
				return {
					success: false,
					type: "server",
					message:
						"An error occurred while creating the short URL. Please try again later.",
				};
			}
		},
	);
