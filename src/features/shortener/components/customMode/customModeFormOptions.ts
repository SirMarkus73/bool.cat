import { formOptions } from "@tanstack/react-form";
import { nanoid } from "nanoid";
import { z } from "zod";
import { slugify } from "#/features/shortener/lib/slugify";
import { createCustomShortUrl } from "#/features/shortener/server/createCustomShortUrl";

const formSchema = z.object({
	targetUrl: z.url(),
	slug: z.string().min(1).max(40),
	expirationDate: z.date(),
});

type OnSuccess = ((slug: string) => void) | undefined;

const defaultValues: z.infer<typeof formSchema> = {
	targetUrl: "",
	expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 7 days from now
	slug: nanoid(6),
};

export const customModeFormOptions = formOptions({
	defaultValues,
	validators: {
		onChange: formSchema,
	},
	onSubmitMeta: {
		onSuccess: undefined as OnSuccess,
	},

	onSubmit: async ({
		value: { expirationDate, slug, targetUrl },
		formApi,
		meta,
	}) => {
		const sluggedSlug = slugify(slug);

		const result = await createCustomShortUrl({
			data: { expirationDate, slug: sluggedSlug, targetUrl },
		});

		if (!result.success) {
			formApi.setErrorMap({
				onSubmit: {
					fields: {},
					form: "An error occurred while creating the short URL. Please try again later.",
				},
			});
			return;
		}

		meta.onSuccess?.(sluggedSlug);
	},
});
