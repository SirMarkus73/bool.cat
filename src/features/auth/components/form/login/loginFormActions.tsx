import { Button } from "#/components/ui/button";
import { withForm } from "#/features/appForm/hooks/useAppForm";
import { m } from "#/paraglide/messages";
import { loginFormOptions } from "./loginFormOptions";

export const LoginFormActions = withForm({
	...loginFormOptions,
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
					<form.SubmitButton label={m["forms.auth.login"]()} />
				</form.AppForm>
			</div>
		</div>
	),
});
