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
import { m } from "#/paraglide/messages";
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
									email:
										m[
											"forms.betterAuth.USER_ALREADY_EXISTS_USE_ANOTHER_EMAIL"
										](),
								},
							},
						});
						break;
					}
					case "PASSWORD_TOO_SHORT": {
						formApi.setErrorMap({
							onSubmit: {
								fields: {
									password: m["forms.betterAuth.PASSWORD_TOO_SHORT"](),
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
								form: m["forms.auth.unknown_error"](),
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
				<CardTitle>{m["forms.auth.register"]()}</CardTitle>
				<CardDescription>
					{m["forms.auth.register_description"]()}
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
