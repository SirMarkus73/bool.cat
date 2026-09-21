import { ClientOnly } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarIcon, DicesIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Calendar } from "#/components/ui/calendar";
import { Field, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/ui/popover";
import { Skeleton } from "#/components/ui/skeleton";
import { getUserDateLocale } from "#/lib/getUserDateLocale";
import { ShortUrlResult } from "../shortUrlResult";

function slugify(input: string): string {
	return input
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/(^-|-$)+/g, "");
}

export function CustomModeForm() {
	const [slug, setSlug] = useState(() => nanoid(6));
	const [date, setDate] = useState<Date | undefined>(
		new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 7 days from now
	);

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const twoYearsFromNow = new Date();
	twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);

	return (
		<form className="grid grid-cols-2 gap-3">
			<Field className="col-span-2">
				<FieldLabel>URL</FieldLabel>
				<Input placeholder="https://www.your-super-long-url.com" />
			</Field>

			<Field>
				<FieldLabel>Slug</FieldLabel>
				<ClientOnly fallback={<Skeleton className="h-8 w-full rounded-lg" />}>
					<InputGroup>
						<InputGroupInput
							placeholder="Your custom slug"
							value={slug}
							onChange={(e) => setSlug(e.target.value)}
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
					{/* TODO: Regex a aplicar: /^[a-zA-Z0-9-]+$/ */}
				</ClientOnly>
			</Field>

			<Field>
				<FieldLabel>Expiration Date</FieldLabel>
				<ClientOnly fallback={<Skeleton className="h-8 w-full rounded-lg" />}>
					<Popover>
						<PopoverTrigger
							render={
								<Button
									variant="outline"
									data-empty={!date}
									className="justify-start text-left font-normal data-[empty=true]:text-muted-foreground"
								/>
							}
						>
							<CalendarIcon />
							{date ? (
								format(date, "PPP", { locale: getUserDateLocale() })
							) : (
								<span>Pick a date</span>
							)}
						</PopoverTrigger>
						<PopoverContent className="w-auto p-0">
							<Calendar
								mode="single"
								selected={date}
								onSelect={setDate}
								startMonth={today}
								disabled={(date) => {
									return date < today;
								}}
								endMonth={twoYearsFromNow}
							/>
						</PopoverContent>
					</Popover>
				</ClientOnly>
			</Field>

			<Field className="col-span-2">
				<FieldLabel htmlFor="shortened-url">Shortened URL</FieldLabel>
				<ShortUrlResult slug={slugify(slug)} id="shortened-url" />
			</Field>

			<Button className="col-start-2 justify-self-end" type="submit">
				Shorten URL
			</Button>
		</form>
	);
}
