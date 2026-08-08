import { FieldGroup, FieldSet } from "#/components/ui/field";
import { withForm } from "#/hooks/useAppForm";
import { m } from "#/paraglide/messages";
import { createShortUrlFormOptions } from "./createShortUrlFormOptions";

export const CreateShortUrlForm = withForm({
	...createShortUrlFormOptions,
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
					<form.AppField name="targetUrl">
						{(field) => (
							<field.InputField
								label={m["forms.short_url.target_url"]()}
								type="url"
								required
								autoComplete="url"
								placeholder="https://example.com"
							/>
						)}
					</form.AppField>
				</FieldGroup>
			</FieldSet>
		</form>
	),
});
