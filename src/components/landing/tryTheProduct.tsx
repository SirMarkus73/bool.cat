import { useState } from "react";
import { createShortUrl } from "#/server/url/createShortUrl";
import { Button } from "../ui/button";
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

export function TryTheProduct() {
	const [slug, setSlug] = useState<string>();

	const onSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
		e.preventDefault();

		const formData = new FormData(e.currentTarget);
		const url = formData.get("url") as string;

		console.log("URL:", url);

		const { slug } = await createShortUrl({ data: { longUrl: url } });
		setSlug(slug);
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
					<form onSubmit={onSubmit}>
						<FieldSet>
							<FieldGroup>
								<Field>
									<FieldLabel htmlFor="url">Ingresa tu enlace</FieldLabel>
									<Input
										name="url"
										id="url"
										placeholder="https://example.com"
									/>
								</Field>

								<Button type="submit" className="whitespace-nowrap">
									Acortar
								</Button>
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
