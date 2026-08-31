import { Button } from "#/components/ui/button";
import { withForm } from "#/features/appForm/hooks/useAppForm";
import { m } from "#/paraglide/messages";
import { registerFormOptions } from "./registerFormOption";

export const RegisterFormActions = withForm({
	...registerFormOptions,
	render: ({ form }) => (
		<div className="flex justify-around">
			<form.AppForm>
				<form.FormRootError />
			</form.AppForm>

			<div>
				<Button
					type="reset"
					form={form.formId}
					variant="secondary"
					onClick={(e) => {
						e.preventDefault();
						form.reset();
					}}
				>
					{m["forms.reset_form"]()}
				</Button>

				<form.AppForm>
					<form.SubmitButton label={m["forms.auth.register"]()} />
				</form.AppForm>
			</div>
		</div>
	),
});
