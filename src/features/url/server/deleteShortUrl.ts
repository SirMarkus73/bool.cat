import { createServerFn } from "@tanstack/react-start";
import { and, eq } from "drizzle-orm";
import { z } from "zod";
import { db } from "#/db";
import { shortUrl } from "#/db/schema";
import { ensureAuthenticated } from "#/features/auth/server/middleware";
import type { ApiResponse } from "#/interfaces/api";
import { isDatabaseError } from "#/lib/isDatabaseError";

const deleteShortUrlSchema = z.object({
	slug: z.string({ error: "Slug must be a string" }).min(1, "Slug is required"),
});

export const deleteShortUrl = createServerFn({
	method: "POST",
})

	.middleware([ensureAuthenticated])
	.validator(deleteShortUrlSchema)
	.handler(async ({ context, data }): Promise<ApiResponse<null>> => {
		const { user } = context;
		const { slug } = data;

		try {
			const result = await db
				.delete(shortUrl)
				.where(and(eq(shortUrl.slug, slug), eq(shortUrl.ownerId, user.id)));

			if (result.rowCount === 0) {
				return {
					success: false,
					message:
						"No URL found with the provided slug for the authenticated user.",
					type: "server",
				};
			}

			return {
				success: true,
				data: null,
			};
		} catch (error) {
			if (isDatabaseError(error)) {
				return {
					success: false,
					message: "An error occurred while deleting the URL.",
					type: "server",
				};
			}

			return {
				success: false,
				message: "An unexpected error occurred.",
				type: "server",
			};
		}
	});
