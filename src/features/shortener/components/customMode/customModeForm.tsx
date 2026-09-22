import { ClientOnly, useNavigate } from "@tanstack/react-router";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { type SubmitEventHandler, useState } from "react";
import { Button } from "#/components/ui/button";
import { Calendar } from "#/components/ui/calendar";
import { Field, FieldLabel } from "#/components/ui/field";

import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "#/components/ui/popover";
import { Skeleton } from "#/components/ui/skeleton";
import { useAppForm } from "#/features/appForm/hooks/useAppForm";
import { getUserDateLocale } from "#/lib/getUserDateLocale";
import { m } from "#/paraglide/messages";
import { customModeFormOptions } from "./customModeFormOptions";
import { CustomSlugInput } from "./customSlugInput";

export function CustomModeForm() {
	const form = useAppForm(customModeFormOptions);

	const [date, setDate] = useState<Date | undefined>(
		new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // Default to 7 days from now
	);
	const navigate = useNavigate();

	const onSubmit: SubmitEventHandler = async (e) => {
		e.preventDefault();
		console.log("Submit");
		await form.handleSubmit({ navigate });
		console.log("Submit done");
	};

	const today = new Date();
	today.setHours(0, 0, 0, 0);

	const twoYearsFromNow = new Date();
	twoYearsFromNow.setFullYear(twoYearsFromNow.getFullYear() + 2);

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
							type="url"
							placeholder="https://www.your-super-long-url.com"
							className="@xl:col-span-2"
						/>
					)}
				</form.AppField>

				<CustomSlugInput form={form} />

				<Field>
					<ClientOnly
						fallback={<span>{m["shortener.expiration_date"]()}</span>}
					>
						<FieldLabel htmlFor="expiration-date-picker">
							{m["shortener.expiration_date"]()}
						</FieldLabel>
					</ClientOnly>
					<ClientOnly fallback={<Skeleton className="h-8 w-full rounded-lg" />}>
						<Popover>
							<PopoverTrigger
								render={
									<Button
										id="expiration-date-picker"
										name="expiration-date-picker"
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
