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
import { RegisterForm } from "./registerForm";
import { RegisterFormActions } from "./registerFormActions";
import { registerFormOptions } from "./registerFormOption";

type Props = {
	className?: string;
};

export function RegisterCard({ className }: Props) {
	const navigate = useNavigate();

	const form = useAppForm({
		...registerFormOptions,
		onSubmit: async ({ value, formApi }) => {
			const { error } = await authClient.signUp.email({
				name: value.name,
				email: value.email,
				password: value.password,
			});

			if (error) {
				switch (error.code) {
					case "USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL": {
						formApi.setErrorMap({
							onSubmit: {
								fields: {
									email: "Ya existe una cuenta con este correo electrónico",
								},
							},
						});
						break;
					}
					case "PASSWORD_TOO_SHORT": {
						formApi.setErrorMap({
							onSubmit: {
								fields: {
									password: "La contraseña es demasiado corta",
								},
							},
						});
						break;
					}

					default: {
						console.error("Error desconocido al registrarse:", error);
						formApi.setErrorMap({
							onSubmit: {
								fields: {},
								form: "Ha ocurrido un error desconocido. Por favor, inténtalo de nuevo más tarde.",
							},
						});
					}
				}

				return;
			}

			throw navigate({ to: "/app" });
		},
	});

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>Registrarse</CardTitle>
				<CardDescription>
					Introduce tu correo electrónico y contraseña para registrarte.
				</CardDescription>
			</CardHeader>
			<CardContent>
				<RegisterForm form={form} />
			</CardContent>
			<CardFooter>
				<RegisterFormActions form={form} />
			</CardFooter>
		</Card>
	);
}
