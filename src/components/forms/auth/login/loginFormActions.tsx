import { Button } from "#/components/ui/button";
import { Field } from "#/components/ui/field";
import { withForm } from "#/hooks/useAppForm";
import { loginFormOptions } from "./loginFormOptions";

export const LoginFormActions = withForm({
	...loginFormOptions,
	render: ({ form }) => (
		<Field orientation="horizontal">
			<Button
				type="reset"
				form={form.formId}
				variant="secondary"
				onClick={(e) => {
					e.preventDefault();
					form.reset();
				}}
			>
				Reiniciar formulario
			</Button>

			<form.AppForm>
				<form.SubmitButton label="Iniciar sesión" />
			</form.AppForm>
		</Field>
	),
});
