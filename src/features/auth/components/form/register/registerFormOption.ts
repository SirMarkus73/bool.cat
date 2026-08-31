import { formOptions } from "@tanstack/react-form";
import { z } from "zod";
import { m } from "#/paraglide/messages";
import { emailSchema, passwordSchema } from "../sharedSchemas";

const NAME_MIN_LENGTH = 3;
const NAME_MAX_LENGTH = 50;

const registerSchema = z.object({
	name: z
		.string()
		.min(NAME_MIN_LENGTH, {
			error: m["forms.auth.name_min_length"]({ minLength: NAME_MIN_LENGTH }),
		})
		.max(NAME_MAX_LENGTH, {
			error: m["forms.auth.name_max_length"]({ maxLength: NAME_MAX_LENGTH }),
		}),
	email: emailSchema,
	password: passwordSchema,
	repeatPassword: z.string(),
});

export const registerFormOptions = formOptions({
	defaultValues: {
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
	},

	validators: {
		onChange: registerSchema,
	},
});
