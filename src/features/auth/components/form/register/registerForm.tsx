import { FieldGroup, FieldSet } from "#/components/ui/field";
import { withForm } from "#/features/appForm/hooks/useAppForm";
import { m } from "#/paraglide/messages";
import { registerFormOptions } from "./registerFormOption";

export const RegisterForm = withForm({
	...registerFormOptions,
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
					{
						<form.AppField name="name">
							{(field) => (
								<field.InputField
									label={m["forms.auth.name"]()}
									required
									type="text"
									autoComplete="name"
									placeholder={m["forms.auth.your_name"]()}
								/>
							)}
						</form.AppField>
					}

					{
						<form.AppField name="email">
							{(field) => (
								<field.InputField
									label={m["forms.auth.email"]()}
									required
									type="email"
									autoComplete="email"
									placeholder="example@bool.cat"
								/>
							)}
						</form.AppField>
					}

					{
						<form.AppField name="password">
							{(field) => (
								<field.InputField
									label={m["forms.auth.password"]()}
									required
									type="password"
									autoComplete="new-password"
									placeholder="••••••••"
								/>
							)}
						</form.AppField>
					}

					{
						<form.AppField
							name="repeatPassword"
							validators={{
								onChange: ({ value, fieldApi }) => {
									const password = fieldApi.form.getFieldValue("password");

									if (value !== password) {
										return m["forms.auth.passwords_do_not_match"]();
									}
								},
							}}
						>
							{(field) => (
								<field.InputField
									label={m["forms.auth.password_confirm"]()}
									type="password"
									required
									autoComplete="new-password"
									placeholder="••••••••"
								/>
							)}
						</form.AppField>
					}
				</FieldGroup>
			</FieldSet>
		</form>
	),
});
