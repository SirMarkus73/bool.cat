import { FieldGroup, FieldSet } from "#/components/ui/field";
import { withForm } from "#/features/appForm/hooks/useAppForm";
import { m } from "#/paraglide/messages";
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
								label={m["forms.auth.email"]()}
								type="email"
								required
								autoComplete="email"
								placeholder="example@bool.cat"
							/>
						)}
					</form.AppField>

					<form.AppField name="password">
						{(field) => (
							<field.InputField
								label={m["forms.auth.password"]()}
								type="password"
								required
								autoComplete="current-password"
								placeholder="••••••••"
							/>
						)}
					</form.AppField>
				</FieldGroup>
			</FieldSet>
		</form>
	),
});
