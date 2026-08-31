import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "#/db";
import type { ShortUrl } from "#/features/url/interfaces/shortUrl";
import type { ApiResponse } from "#/interfaces/api";

const getUrlBySlugSchema = z.object({
	slug: z.string().min(1, "Slug is required"),
});

export const getUrlBySlug = createServerFn({ method: "GET" })
	.validator(getUrlBySlugSchema)
	.handler(async ({ data }): Promise<ApiResponse<ShortUrl>> => {
		const { slug } = data;

		const url = await db.query.shortUrl.findFirst({
			where: {
				slug,
				expirationDate: {
					gt: new Date(),
				},
			},
		});

		if (!url) {
			return {
				success: false,
				type: "server",
				message: "Short URL not found or has expired.",
			};
		}

		return {
			success: true,
			data: url,
		};
	});
