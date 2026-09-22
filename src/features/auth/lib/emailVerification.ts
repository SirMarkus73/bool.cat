import { createClientOnlyFn } from "@tanstack/react-start";
import { getLocale } from "#/paraglide/runtime";
import { authClient } from "./auth-client";

const EMAIL_VALIDATION_KEY = "emailValidation";

export const prepareEmailVerification = createClientOnlyFn((email: string) => {
	const lang = getLocale();

	authClient.sendVerificationEmail({
		email,
		callbackURL: "/app",

		fetchOptions: {
			headers: {
				"Accept-Language": lang,
			},
		},
	});

	sessionStorage.setItem(EMAIL_VALIDATION_KEY, email);
});

export const getVerificationEmail = createClientOnlyFn(() => {
	const email = sessionStorage.getItem(EMAIL_VALIDATION_KEY);

	return email;
});
