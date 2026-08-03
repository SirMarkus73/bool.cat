import { useNavigate } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { useAppForm } from "#/hooks/useAppForm";
import { authClient } from "#/lib/auth-client";
import { LoginForm } from "./loginForm";
import { LoginFormActions } from "./loginFormActions";
import { loginFormOptions } from "./loginFormOptions";

type Props = {
	className?: string;
};

export function LoginCard({ className }: Props) {
	const navigate = useNavigate();
	const form = useAppForm({
		...loginFormOptions,
		onSubmit: async ({ value, formApi }) => {
			const res = await authClient.signIn.email({
				email: value.email,
				password: value.password,
			});

			if (res.data) {
				throw navigate({
					to: "/app",
				});
			}

			if (res.error) {
				switch (res.error.code) {
					case "INVALID_EMAIL_OR_PASSWORD": {
						formApi.setErrorMap({
							onChange: {
								fields: {
									email: "Correo electrónico o contraseña incorrectos",
									password: "Correo electrónico o contraseña incorrectos",
								},
							},
						});
						break;
					}
					default: {
						formApi.setErrorMap({
							onChange: {
								fields: {
									email: "Error desconocido",
									password: "Error desconocido",
								},
							},
						});
						break;
					}
				}
			}
		},
	});

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Iniciar sesión</CardTitle>
				<CardDescription>
					Introduce tu correo electrónico y contraseña para iniciar sesión.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<LoginForm form={form} />
			</CardContent>
			<CardFooter>
				<LoginFormActions form={form} />
			</CardFooter>
		</Card>
	);
}
