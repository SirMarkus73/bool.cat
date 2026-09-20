import { Dice1Icon, DicesIcon } from "lucide-react";
import { useState } from "react";
import {
	Card,
	CardAction,
	CardContent,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { Field, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { Switch } from "#/components/ui/switch";

type UrlShortenerProps = {
	isSignedIn: boolean;
};

export function UrlShortener({ isSignedIn }: UrlShortenerProps) {
	const [isChecked, setIsChecked] = useState(true);

	return (
		<Card className="mx-8 my-4">
			<CardHeader>
				<CardTitle>Shorten your URL</CardTitle>
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
				<div className="grid grid-rows-2 grid-cols-2 gap-5 place-items-center">
					<Field>
						<FieldLabel>URL</FieldLabel>
						<Input placeholder="https://www.your-super-long-url.com" />
					</Field>

					<Field className="col-span-2">
						<FieldLabel>Shortened URL</FieldLabel>
						<InputGroup>
							<InputGroupInput
								value="https://bool.cat/A5G3B"
								readOnly
								role="status"
							/>
							<InputGroupAddon align="inline-end">
								<DicesIcon />
							</InputGroupAddon>
						</InputGroup>
					</Field>
				</div>
			</CardContent>
		</Card>
	);
}
