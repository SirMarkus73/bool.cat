const EMAIL_VALIDATION_KEY = "emailValidation";

export function prepareEmailValidation(email: string) {
	sessionStorage.setItem(EMAIL_VALIDATION_KEY, email);
}

export function getValidationEmail() {
	const email = sessionStorage.getItem(EMAIL_VALIDATION_KEY);

	return email;
}
