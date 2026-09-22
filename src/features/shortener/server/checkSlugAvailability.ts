import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "#/db";
import type { ApiResponse } from "#/interfaces/api";

const validator = z.object({
	slug: z.string(),
});

export const checkSlugAvailability = createServerFn({ method: "POST" })
	.validator(validator)
	.handler(async ({ data: { slug } }): Promise<ApiResponse<null>> => {
		const existingSlug = await db.query.shortUrl.findFirst({
			where: { slug },
			columns: {
				id: true,
			},
		});

		if (existingSlug) {
			return {
				success: false,
				type: "server",
				message: "Slug is already taken.",
			};
		}
		return {
			success: true,
			data: null,
		};
	});
