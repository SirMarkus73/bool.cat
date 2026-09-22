import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { withAuthContext } from "#/features/auth/server/middleware";
import { createCustomShortUrl as createCustomShortUrlService } from "#/features/shortener/service/createCustomShortUrl";

export const createCustomShortUrlValidator = z.object({
	slug: z.string().min(1).max(40),
	targetUrl: z.url(),
	expirationDate: z.date(),
});

export const createCustomShortUrl = createServerFn({
	method: "POST",
})
	.middleware([withAuthContext])
	.validator(createCustomShortUrlValidator)
	.handler(({ data, context }) =>
		createCustomShortUrlService(data, context.auth),
	);
