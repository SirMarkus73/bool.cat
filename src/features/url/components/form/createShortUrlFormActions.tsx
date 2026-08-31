import { Button } from "#/components/ui/button";
import { withForm } from "#/features/appForm/hooks/useAppForm";
import { m } from "#/paraglide/messages";
import { createShortUrlFormOptions } from "./createShortUrlFormOptions";

export const CreateShortUrlFormActions = withForm({
	...createShortUrlFormOptions,
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
					<form.SubmitButton label={m["forms.short_url.shorten_url"]()} />
				</form.AppForm>
			</div>
		</div>
	),
});
