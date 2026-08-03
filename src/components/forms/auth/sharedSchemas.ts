import { z } from "zod";
import { m } from "#/paraglide/messages";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 128;

export const passwordSchema = z
	.string()
	.min(PASSWORD_MIN_LENGTH, {
		error: m["forms.auth.password_min_length"]({
			minLength: PASSWORD_MIN_LENGTH,
		}),
	})
	.max(PASSWORD_MAX_LENGTH, {
		error: m["forms.auth.password_max_length"]({
			maxLength: PASSWORD_MAX_LENGTH,
		}),
	});

export const emailSchema = z
	.email({ error: m["forms.auth.invalid_email"]() })
	.min(1, { error: m["forms.auth.required_email"]() });
