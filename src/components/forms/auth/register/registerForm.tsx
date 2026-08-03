import { FieldGroup, FieldSet } from "#/components/ui/field";
import { withForm } from "#/hooks/useAppForm";
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
									label="Nombre completo"
									required
									type="text"
									autoComplete="name"
									placeholder="Evil Rabbit"
								/>
							)}
						</form.AppField>
					}

					{
						<form.AppField name="email">
							{(field) => (
								<field.InputField
									label="Correo electrónico"
									required
									type="email"
									autoComplete="email"
									placeholder="evil.rabbit@example.com"
								/>
							)}
						</form.AppField>
					}

					{
						<form.AppField name="password">
							{(field) => (
								<field.InputField
									label="Contraseña"
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
							// listeners={{
							// 	onChange: ({ value, fieldApi }) => {
							// 		const password = fieldApi.form.getFieldValue("password");

							// 		if (value !== password) {
							// 			return "Las contraseñas no coinciden";
							// 		}
							// 	},
							// }}
							validators={{
								onChange: ({ value, fieldApi }) => {
									const password = fieldApi.form.getFieldValue("password");

									if (value !== password) {
										return "Las contraseñas no coinciden";
									}
								},
							}}
						>
							{(field) => (
								<field.InputField
									label="Repetir contraseña"
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
