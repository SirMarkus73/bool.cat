import { Button } from "#/components/ui/button";
import { withForm } from "#/hooks/useAppForm";
import { registerFormOptions } from "./registerFormOption";

export const RegisterFormActions = withForm({
	...registerFormOptions,
	render: ({ form }) => (
		<div className="flex">
			<form.AppForm>
				<form.FormRootError />
			</form.AppForm>

			<div className="ml-auto">
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
					<form.SubmitButton label="Registrarse" />
				</form.AppForm>
			</div>
		</div>
	),
});
