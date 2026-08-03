import { formOptions } from "@tanstack/react-form";
import { z } from "zod";
import { emailSchema, passwordSchema } from "../sharedSchemas";

const formSchema = z.object({
	email: emailSchema,
	password: passwordSchema,
});

const defaultValues: z.infer<typeof formSchema> = {
	email: "",
	password: "",
};

export const loginFormOptions = formOptions({
	defaultValues,
	validators: {
		onChange: formSchema,
	},
});
