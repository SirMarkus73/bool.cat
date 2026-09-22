import { db } from "#/db";
import { shortUrl } from "#/db/schema";
import type { AuthContext } from "#/features/auth/server/middleware";
import { slugify } from "#/features/shortener/lib/slugify";
import type { ApiResponse } from "#/interfaces/api";
import { checkSlugAvailability } from "./checkSlugAvailability";

type Input = {
	slug: string;
	targetUrl: string;
	expirationDate: Date;
};

export async function createCustomShortUrl(
	{ expirationDate, slug, targetUrl }: Input,
	auth: AuthContext,
): Promise<ApiResponse<null>> {
	if (!auth.success) return auth;

	const { user } = auth.data;

	if (!(await checkSlugAvailability(slug)).success) {
		return {
			success: false,
			type: "server",
			message: "Slug is already taken.",
		};
	}

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
}
