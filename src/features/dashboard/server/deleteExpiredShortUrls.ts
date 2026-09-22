import { createServerFn } from "@tanstack/react-start";
import { and, eq, lt } from "drizzle-orm";
import { db } from "#/db";
import { shortUrl } from "#/db/schema";
import { withAuthContext } from "#/features/auth/server/middleware";
import type { ApiResponse } from "#/interfaces/api";
import { isDatabaseError } from "#/lib/isDatabaseError";

export const deleteExpiredShortUrls = createServerFn({
	method: "POST",
})
	.middleware([withAuthContext])
	.handler(async ({ context }): Promise<ApiResponse<null>> => {
		if (!context.auth.success) return context.auth;

		const { user } = context.auth.data;

		try {
			await db
				.delete(shortUrl)
				.where(
					and(
						eq(shortUrl.ownerId, user.id),
						lt(shortUrl.expirationDate, new Date()),
					),
				);

			return {
				success: true,
				data: null,
			};
		} catch (error) {
			if (isDatabaseError(error)) {
				return {
					success: false,
					type: "server",
					message: "An error occurred while deleting expired URLs.",
				};
			}

			return {
				success: false,
				type: "server",
				message: "An unexpected error occurred.",
			};
		}
	});
