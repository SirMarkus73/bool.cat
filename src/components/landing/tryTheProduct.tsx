import { formOptions } from "@tanstack/react-form";
import { useState } from "react";
import z from "zod";
import { useAppForm } from "#/hooks/useAppForm";
import { createShortUrl } from "#/server/url/createShortUrl";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "../ui/card";
import { Field, FieldGroup, FieldLabel, FieldSet } from "../ui/field";
import { Input } from "../ui/input";

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
		onSubmit: async ({ value }) => {
			const { url } = value;

			const { slug } = await createShortUrl({ data: { longUrl: url } });
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
					<CardTitle>Acorta tu primer enlace</CardTitle>
					<CardDescription>
						Tus enlaces expiran automáticamente después de{" "}
						<strong>1 semana (7 días)</strong> y se eliminarán de forma segura.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<form onSubmit={onSubmit} id={form.formId}>
						<FieldSet>
							<FieldGroup>
								<form.AppField name="url">
									{({ InputField }) => (
										<InputField
											label="Ingresa tu enlace"
											placeholder="https://example.com"
										/>
									)}
								</form.AppField>

								<form.AppForm>
									<form.SubmitButton label="Acortar" />
								</form.AppForm>
							</FieldGroup>
						</FieldSet>
					</form>

					{slug && (
						<Field>
							<FieldLabel>Tu enlace corto</FieldLabel>
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
