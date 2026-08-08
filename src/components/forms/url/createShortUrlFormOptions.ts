import { formOptions } from "@tanstack/react-form";
import { z } from "zod";
import { m } from "#/paraglide/messages";

const formSchema = z.object({
	targetUrl: z
		.url({ error: m["forms.invalid_url"]() })
		.min(1, { error: m["forms.required_url"]() }),
});

const defaultValues: z.infer<typeof formSchema> = {
	targetUrl: "",
};

export const createShortUrlFormOptions = formOptions({
	defaultValues,
	validators: {
		onChange: formSchema,
	},
});
