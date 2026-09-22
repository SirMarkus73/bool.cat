import { db } from "#/db";
import type { ApiResponse } from "#/interfaces/api";

export async function checkSlugAvailability(
	slug: string,
): Promise<ApiResponse<null>> {
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
}
