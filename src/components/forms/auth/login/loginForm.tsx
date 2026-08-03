import { FieldGroup, FieldSet } from "#/components/ui/field";
import { withForm } from "#/hooks/useAppForm";
import { loginFormOptions } from "./loginFormOptions";

export const LoginForm = withForm({
	...loginFormOptions,
	render: ({ form }) => (
		<form
			id={form.formId}
			onSubmit={(e) => {
				e.preventDefault();
				form.handleSubmit();
			}}
		>
			<FieldSet>
				<FieldGroup>
					<form.AppField name="email">
						{(field) => (
							<field.InputField
								label="Correo electrónico"
								type="email"
								required
								autoComplete="email"
								placeholder="evil.rabbit@example.com"
							/>
						)}
					</form.AppField>

					<form.AppField name="password">
						{(field) => (
							<field.InputField
								label="Contraseña"
								type="password"
								required
								autoComplete="current-password"
								placeholder="Your password"
							/>
						)}
					</form.AppField>
				</FieldGroup>
			</FieldSet>
		</form>
	),
});
