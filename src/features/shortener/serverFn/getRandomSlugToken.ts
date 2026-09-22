import { createServerFn } from "@tanstack/react-start";
import { getRandomSlugToken as getRandomSlugTokenService } from "#/features/shortener/service/getRandomSlugToken";

export const getRandomSlugToken = createServerFn({ method: "GET" }).handler(
	() => getRandomSlugTokenService(),
);
