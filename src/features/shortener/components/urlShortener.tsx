import { Activity, useState } from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Field, FieldLabel } from "#/components/ui/field";
import { Switch } from "#/components/ui/switch";
import { CustomModeForm } from "#/features/shortener/components/customMode/customModeForm";
import { SimpleModeForm } from "#/features/shortener/components/simpleMode/simpleModeForm";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";

type UrlShortenerProps = {
	isSignedIn?: boolean;
	onSuccess?: (slug: string) => void;
	className?: string;
};

export function UrlShortener({
	isSignedIn = false,
	onSuccess,
	className,
}: UrlShortenerProps) {
	const [isChecked, setIsChecked] = useState(isSignedIn);

	return (
		<Card className={cn("mx-8 my-4", className)}>
			<CardHeader>
				<CardTitle>{m["shortener.title"]()}</CardTitle>
				<CardAction>
					<Field orientation="horizontal" className="flex justify-end">
						<Switch
							defaultChecked={isSignedIn}
							disabled={!isSignedIn}
							checked={isSignedIn ? isChecked : false}
							onCheckedChange={setIsChecked}
						/>
						<FieldLabel>Custom Mode</FieldLabel>
					</Field>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Activity mode={isChecked && isSignedIn ? "visible" : "hidden"}>
					<CustomModeForm onSuccess={onSuccess} />
				</Activity>
				<Activity mode={!isChecked ? "visible" : "hidden"}>
					<SimpleModeForm onSuccess={onSuccess} />
				</Activity>
			</CardContent>
		</Card>
	);
}
