import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "#/db";
import { ensureAuthenticated } from "../auth/middleware";

const validationSchema = z.object({
	q: z.string().optional(),
});

export const listUrls = createServerFn({ method: "GET" })

	.middleware([ensureAuthenticated])
	.validator(validationSchema)
	.handler(async ({ context, data }) => {
		const { user } = context;
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

		return urls;
	});
