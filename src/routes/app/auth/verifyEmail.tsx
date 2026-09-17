import { createFileRoute, redirect, useNavigate } from "@tanstack/react-router";
import { Button } from "#/components/ui/button";
import { authClient } from "#/features/auth/lib/auth-client";
import { getValidationEmail } from "#/features/auth/lib/emailValidation";

export const Route = createFileRoute("/app/auth/verifyEmail")({
	component: VerifyEmail,
});

function VerifyEmail() {
	const navigate = useNavigate();
	const session = authClient.useSession();

	const email = getValidationEmail();

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
			<h1 className="text-2xl font-bold">Verifica tu correo electrónico</h1>
			<p className="text-lg">
				Para poder iniciar sesión, primero debes verificar tu correo
				electrónico. Se ha enviado un correo electrónico de verificación a{" "}
				<strong>{email}</strong>. Si no lo encuentras, revisa tu carpeta de spam
				o correo no deseado.
			</p>
			<p>
				Si después de revisar tu bandeja de entrada no has recibido el correo de
				verificación, pulsa el botón de abajo para reenviar el correo
				electrónico de verificación.
			</p>
			<Button type="button" onClick={resendVerificationEmail}>
				Reenviar correo de verificación
			</Button>
		</main>
	);
}
