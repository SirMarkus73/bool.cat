import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { checkSlugAvailability as checkSlugAvailabilityService } from "#/features/shortener/service/checkSlugAvailability";

export const checkSlugAvailabilityValidator = z.object({
	slug: z.string(),
});

export const checkSlugAvailability = createServerFn({ method: "POST" })
	.validator(checkSlugAvailabilityValidator)
	.handler(({ data: { slug } }) => checkSlugAvailabilityService(slug));
