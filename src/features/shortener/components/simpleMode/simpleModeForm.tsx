import type { SubmitEventHandler } from "react";
import { useAppForm } from "#/features/appForm/hooks/useAppForm";
import { m } from "#/paraglide/messages";
import { simpleModeFormOptions } from "./simpleModeFormOptions";
import { SimpleSlugInput } from "./simpleSlugInput";

type SimpleModeFormProps = {
	onSuccess?: (slug: string) => void;
};

export function SimpleModeForm({ onSuccess }: SimpleModeFormProps) {
	const form = useAppForm(simpleModeFormOptions);

	const onSubmit: SubmitEventHandler = async (e) => {
		e.preventDefault();
		await form.handleSubmit({ onSuccess });
	};

	return (
		<div className="@container">
			<form
				className="grid @xl:grid-cols-2 gap-3"
				id={form.formId}
				onSubmit={onSubmit}
			>
				<form.AppField name="targetUrl">
					{({ InputField }) => (
						<InputField
							label="URL"
							placeholder="https://www.your-super-long-url.com"
						/>
					)}
				</form.AppField>

				<SimpleSlugInput form={form} />

				<form.AppForm>
					<form.FormRootError />
				</form.AppForm>
				<div className="@xl:col-start-2 flex justify-end">
					<form.AppForm>
						<form.SubmitButton label={m["shortener.shorten_url"]()} />
					</form.AppForm>
				</div>
			</form>
		</div>
	);
}
