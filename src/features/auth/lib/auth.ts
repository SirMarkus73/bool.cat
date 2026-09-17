import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "#/db/index"; // your drizzle instance
import * as schema from "#/db/schema/auth";
import VerificationEmail from "#/features/emails/components/auth/verificationEmail";
import { sendEmail } from "#/features/emails/lib/sendEmail";
import { m } from "#/paraglide/messages";
import { getLocale } from "#/paraglide/runtime";

export const auth = betterAuth({
	database: drizzleAdapter(db, {
		provider: "pg", // or "mysql", "sqlite"
		schema,
	}),
	emailAndPassword: {
		enabled: true,
		requireEmailVerification: true,
	},
	emailVerification: {
		autoSignInAfterVerification: true,
		sendOnSignIn: false,
		sendOnSignUp: false,
		sendVerificationEmail: async ({ url, user }, request) => {
			console.log("Locale from paraglide", getLocale());

			const lang = request?.headers.get("Accept-Language");
			console.log("Locale from request header", lang);

			sendEmail({
				to: user.email,
				subject: m["email_verification.email.subject"](),
				Component: VerificationEmail,
				params: { url, username: user.name },
			});
		},
	},
	plugins: [tanstackStartCookies()],
});
