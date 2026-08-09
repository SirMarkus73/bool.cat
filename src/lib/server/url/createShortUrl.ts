import { createServerFn } from "@tanstack/react-start";
import { nanoid } from "nanoid";
import z from "zod";
import { db } from "#/db";
import { shortUrl } from "#/db/schema";
import { getSession } from "../auth/session";

const createShortUrlSchema = z.object({
	longUrl: z.url(),
});

export const createShortUrl = createServerFn({ method: "POST" })
	.validator(createShortUrlSchema)
	.handler(async ({ data }) => {
		const { longUrl } = data;
		const session = await getSession();

		const [{ slug }] = await db
			.insert(shortUrl)
			.values({
				slug: nanoid(6),
				redirectUrl: longUrl,
				ownerId: session?.user.id,
			})
			.returning({ slug: shortUrl.slug });

		return { slug };
	});
