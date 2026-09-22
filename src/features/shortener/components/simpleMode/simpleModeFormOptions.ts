import { formOptions } from "@tanstack/react-form";
import type { useNavigate } from "@tanstack/react-router";
import { z } from "zod";
import { createSimpleShortUrl } from "../../server/createSimpleShortUrl";

const formSchema = z.object({
	targetUrl: z.url().min(1, { error: "Please enter a valid URL." }),
	expirationDate: z.date(),
	slugField: z
		.object({
			slug: z.string().min(1).max(40),
			slugToken: z.string(),
		})
		.required(),
});

type Navigate = ReturnType<typeof useNavigate> | undefined;

const defaultValues: z.infer<typeof formSchema> = {
	targetUrl: "",
	expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 7 days from now
	slugField: {
		slug: "",
		slugToken: "",
	},
};

export const simpleModeFormOptions = formOptions({
	defaultValues,
	validators: {
		onChange: formSchema,
	},
	onSubmitMeta: {
		navigate: undefined as Navigate,
	},

	onSubmit: async ({ value: { slugField, targetUrl }, formApi, meta }) => {
		const result = await createSimpleShortUrl({
			data: { targetUrl, slugToken: slugField.slugToken },
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

		meta.navigate?.({ to: "/app", search: { preview: slugField.slug } });
	},
});
