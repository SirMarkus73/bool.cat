import { ClientOnly } from "@tanstack/react-router";
import { DicesIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Field, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { Skeleton } from "#/components/ui/skeleton";
import { ShortUrlResult } from "#/features/shortener/components/shortUrlResult";

export function SimpleModeForm() {
	const [slug, setSlug] = useState(() => nanoid(6));

	return (
		<form className="grid grid-cols-2 gap-3">
			<Field>
				<FieldLabel>URL</FieldLabel>
				<Input placeholder="https://www.your-super-long-url.com" />
			</Field>

			<Field>
				<FieldLabel>Slug</FieldLabel>
				<ClientOnly fallback={<Skeleton className="h-8 w-full rounded-lg" />}>
					<InputGroup>
						<InputGroupInput
							value={slug}
							className="cursor-not-allowed"
							readOnly
						/>
						<InputGroupAddon align="inline-end">
							<Button
								variant="ghost"
								onClick={() => {
									setSlug(nanoid(6));
								}}
							>
								<DicesIcon />
							</Button>
						</InputGroupAddon>
					</InputGroup>
				</ClientOnly>
			</Field>

			<Field className="col-span-2">
				<FieldLabel htmlFor="shortened-url">Shortened URL</FieldLabel>
				<ShortUrlResult slug={slug} id="shortened-url" />
			</Field>

			<Button className="col-start-2 justify-self-end" type="submit">
				Shorten URL
			</Button>
		</form>
	);
}
