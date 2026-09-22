import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { withAuthContext } from "#/features/auth/server/middleware";
import { createSimpleShortUrl as createSimpleShortUrlService } from "#/features/shortener/service/createSimpleShortUrl";

export const createSimpleShortUrlValidator = z.object({
	targetUrl: z.url(),
	slugToken: z.string(),
});

export const createSimpleShortUrl = createServerFn({ method: "POST" })
	.middleware([withAuthContext])
	.validator(createSimpleShortUrlValidator)
	.handler(({ data, context }) =>
		createSimpleShortUrlService(data, context.auth),
	);
