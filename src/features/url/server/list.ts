import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "#/db";
import type { shortUrl } from "#/db/schema";
import { withAuthContext } from "#/features/auth/server/middleware";
import type { ApiResponse } from "#/interfaces/api";

const validationSchema = z.object({
	q: z.string().optional(),
});

type UrlList = (typeof shortUrl.$inferSelect)[];

export const listUrls = createServerFn({ method: "GET" })
	.middleware([withAuthContext])
	.validator(validationSchema)
	.handler(async ({ context, data }): Promise<ApiResponse<UrlList>> => {
		if (!context.auth.success) return context.auth;

		const { user } = context.auth.data;
		const { q } = data;

		const ilikeQuery = (q?.trim().length ?? 0) === 0 ? undefined : `%${q}%`;

		const urls = await db.query.shortUrl.findMany({
			where: {
				user: {
					id: {
						eq: user.id,
					},
				},
				OR: [
					{
						redirectUrl: {
							ilike: ilikeQuery,
						},
					},
					{
						slug: {
							ilike: ilikeQuery,
						},
					},
				],
			},
			orderBy: {
				updatedAt: "desc",
				createdAt: "desc",
			},
		});

		return {
			success: true,
			data: urls,
		};
	});
