import { formOptions } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { useAppForm } from "#/features/appForm/hooks/useAppForm";
import { createShortUrl } from "#/features/url/server/createShortUrl";
import { UNAUTHENTICATED_SHORT_URL_EXPIRATION_HOURS } from "#/lib/constants";
import { m } from "#/paraglide/messages";

const formValidator = z.object({
	url: z.url(),
});

const formOpts = formOptions({
	validators: {
		onChange: formValidator,
	},
	defaultValues: {
		url: "",
	},
});

export function TryTheProduct() {
	const [slug, setSlug] = useState<string>();

	const form = useAppForm({
		...formOpts,
		onSubmit: async ({ value, formApi }) => {
			const { url } = value;

			const { success } = await createShortUrl({
				data: { mode: "guest", longUrl: url },
			});

			if (!success) {
				formApi.setErrorMap({
					onSubmit: {
						fields: {},
						form: "Failed to create short URL. Please try again later.",
					},
				});
				return;
			}

			setSlug(slug);
		},
	});

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();
		form.handleSubmit();
	};

	return (
		<div className="px-6 py-8 flex justify-center">
			<Card className="w-full max-w-2xl shadow-lg">
				<CardHeader>
					<CardTitle>{m["shortener.guest.shorten_first_link"]()}</CardTitle>
					<CardDescription>
						{m["shortener.guest.description"]({
							expirationHours: UNAUTHENTICATED_SHORT_URL_EXPIRATION_HOURS,
						})}
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} id={form.formId}>
						<FieldSet>
							<FieldGroup>
								<form.AppField name="url">
									{({ InputField }) => (
										<InputField
											label={m["shortener.target_url"]()}
											placeholder="https://example.com/your/long/url"
										/>
									)}
								</form.AppField>

								<form.AppForm>
									<form.SubmitButton label={m["shortener.shorten_url"]()} />
									<form.FormRootError />
								</form.AppForm>
							</FieldGroup>
						</FieldSet>
					</form>

					{slug && (
						<Field>
							<FieldLabel>{m["shortener.short_link"]()}</FieldLabel>
							<Input value={`${window.location.origin}/${slug}`} readOnly />
						</Field>
					)}
				</CardContent>
				<CardFooter>
					<p className="opacity-70 text-sm">
						Si te registras, podrás personalizar la duración de cada enlace
						desde tu panel —elige desde unas horas hasta meses, y modifica la
						caducidad cuando quieras.
					</p>
				</CardFooter>
			</Card>
		</div>
	);
}
