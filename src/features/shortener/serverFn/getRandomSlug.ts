import { createServerFn } from "@tanstack/react-start";
import { getRandomSlug as getRandomSlugService } from "#/features/shortener/service/getRandomSlug";

export const getRandomSlug = createServerFn({ method: "GET" }).handler(() =>
	getRandomSlugService(),
);
