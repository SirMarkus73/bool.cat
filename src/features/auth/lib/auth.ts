import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { tanstackStartCookies } from "better-auth/tanstack-start";
import { db } from "#/db/index"; // your drizzle instance
import * as schema from "#/db/schema/auth";
import VerificationEmail from "#/features/emails/components/auth/verificationEmail";
import { sendEmail } from "#/features/emails/lib/sendEmail";
import { m } from "#/paraglide/messages";

function getTrustedOrigins() {
	if (process.env.NODE_ENV === "production") {
		return ["bool.cat"];
	}

	return ["*"];
}

export const auth = betterAuth({
	trustedOrigins: getTrustedOrigins(),
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
		sendVerificationEmail: async ({ url, user }) => {
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
