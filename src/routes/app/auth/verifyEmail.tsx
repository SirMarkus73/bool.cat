import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { authClient } from "#/features/auth/lib/auth-client";
import { getVerificationEmail } from "#/features/auth/lib/emailVerification";
import { m } from "#/paraglide/messages";

export const Route = createFileRoute("/app/auth/verifyEmail")({
	component: VerifyEmail,
	ssr: false,
});

function VerifyEmail() {
	const navigate = useNavigate();
	const session = authClient.useSession();

	const email = getVerificationEmail();

	if (!email) {
		throw redirect({ to: "/app/auth" });
	}

	if (session.data?.user) {
		navigate({ to: "/app" });
	}

	const resendVerificationEmail = async () => {
		authClient.sendVerificationEmail({ email, callbackURL: "/app" });
	};

	return (
		<main className="flex flex-col gap-4 items-center max-w-lg mx-auto my-12">
			<h1 className="text-2xl font-bold">
				{m["email_verification.page.title"]()}
			</h1>
			<p className="text-lg">
				{m["email_verification.page.description"]({ email })}
			</p>
			<Button type="button" onClick={resendVerificationEmail}>
				{m["email_verification.page.resend_button"]()}
			</Button>
		</main>
	);
}
