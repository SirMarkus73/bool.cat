import { createServerFn } from "@tanstack/react-start";
import { SignJWT } from "jose";
import type { ApiResponse } from "#/interfaces/api";
import { serverEnv } from "#/lib/env/server";
import { getRandomSlug } from "./getRandomSlug";

type Response = {
	slug: string;
	slugToken: string;
};

export const getRandomSlugToken = createServerFn({ method: "GET" }).handler(
	async (): Promise<ApiResponse<Response>> => {
		const randomSlugResponse = await getRandomSlug();

		if (!randomSlugResponse.success) return randomSlugResponse;

		try {
			const jwt = await new SignJWT({ slug: randomSlugResponse.data })
				.setProtectedHeader({ alg: "HS256" })
				.setIssuedAt()
				.setExpirationTime("5m")
				.sign(new TextEncoder().encode(serverEnv.JWT_SECRET));

			return {
				success: true,
				data: {
					slug: randomSlugResponse.data.slug,
					slugToken: jwt,
				},
			};
		} catch {
			return {
				success: false,
				type: "server",
				message: "Failed to generate slug token.",
			};
		}
	},
);
