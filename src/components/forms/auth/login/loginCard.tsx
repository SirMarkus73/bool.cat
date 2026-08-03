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
									email: m["forms.betterAuth.INVALID_EMAIL_OR_PASSWORD"](),
									password: m["forms.betterAuth.INVALID_EMAIL_OR_PASSWORD"](),
								},
							},
						});
						break;
					}
					default: {
						formApi.setErrorMap({
							onChange: {
								fields: {},
								form: m["forms.auth.unknown_error"](),
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
				<CardTitle>{m["forms.auth.login"]()}</CardTitle>
				<CardDescription>{m["forms.auth.login_description"]()}</CardDescription>
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
