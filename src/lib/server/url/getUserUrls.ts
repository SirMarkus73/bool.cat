import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "#/db";
import { ensureAuthenticated } from "../auth/ensureAuthenticatedMiddleware";

const validationSchema = z.object({
	q: z.string().optional(),
});

export const getUserUrls = createServerFn({ method: "GET" })

	.middleware([ensureAuthenticated])
	.validator(validationSchema)
	.handler(async ({ context, data }) => {
		const { user } = context;
		const { q } = data;

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
							ilike: q && `%${q}%`,
						},
						slug: {
							ilike: q && `%${q}%`,
						},
					},
				],
			},
		});

		return urls;
	});
