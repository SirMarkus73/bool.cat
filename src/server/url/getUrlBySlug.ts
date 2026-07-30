import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "#/db";

const getUrlBySlugSchema = z.object({
	slug: z.string().min(1, "Slug is required"),
});

export const getUrlBySlug = createServerFn({ method: "GET" })
	.validator(getUrlBySlugSchema)
	.handler(async ({ data }) => {
		const { slug } = data;

		const url = await db.query.shortUrl.findFirst({
			where: {
				slug,
			},
		});

		return url;
	});
