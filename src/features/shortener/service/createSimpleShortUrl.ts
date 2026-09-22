import { jwtVerify } from "jose";
import { db } from "#/db";
import { shortUrl } from "#/db/schema";
import type { AuthContext } from "#/features/auth/server/middleware";
import type { ApiResponse } from "#/interfaces/api";
import { SIMPLE_SHORT_URL_EXPIRATION_HOURS } from "#/lib/constants";
import { serverEnv } from "#/lib/env/server";

type Input = {
	targetUrl: string;
	slugToken: string;
};

export async function createSimpleShortUrl(
	{ slugToken, targetUrl }: Input,
	auth: AuthContext,
): Promise<ApiResponse<null>> {
	let slug: string;

	try {
		const decodedToken = await jwtVerify(
			slugToken,
			new TextEncoder().encode(serverEnv.JWT_SECRET),
		);

		if (
			!decodedToken.payload.slug ||
			typeof decodedToken.payload.slug !== "string"
		) {
			throw new Error("Slug not found in token payload");
		}

		slug = decodedToken.payload.slug;
	} catch {
		return {
			success: false,
			type: "server",
			message: "Invalid or expired slug token.",
		};
	}

	await db.insert(shortUrl).values({
		redirectUrl: targetUrl,
		slug,
		expirationDate: new Date(
			Date.now() + SIMPLE_SHORT_URL_EXPIRATION_HOURS * 60 * 60 * 1000,
		),
		ownerId: auth.success ? auth.data.user.id : null,
	});

	return {
		success: true,
		data: null,
	};
}
