import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import type { ApiResponse } from "#/interfaces/api";
import { checkSlugAvailability } from "./checkSlugAvailability";

const MAXIMUM_RETRIES = 5;

type Response = {
	slug: string;
};

export const getRandomSlug = createServerFn({ method: "GET" }).handler(
	async (): Promise<ApiResponse<Response>> => {
		let retries = 0;

		while (true) {
			const slug = nanoid(6);

			const slugExists = await checkSlugAvailability({ data: { slug } });

			if (slugExists.success) {
				return {
					success: true,
					data: { slug },
				};
			}

			retries++;
			if (retries >= MAXIMUM_RETRIES) break;
		}

		return {
			success: false,
			type: "server",
			message: "Failed to generate a unique slug after multiple attempts.",
		};
	},
);
