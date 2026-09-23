import { Tooltip as BaseToolTip } from "@base-ui/react";
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
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { CustomModeForm } from "#/features/shortener/components/customMode/customModeForm";
import { SimpleModeForm } from "#/features/shortener/components/simpleMode/simpleModeForm";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";

type UrlShortenerProps = {
	isSignedIn?: boolean;
	onSuccess?: (slug: string) => void;
	className?: string;
};

const handle = BaseToolTip.createHandle();

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
						{isSignedIn ? (
							<Switch
								id="custom-mode-switch"
								defaultChecked
								disabled={false}
								checked={isChecked}
								onCheckedChange={setIsChecked}
							/>
						) : (
							<Tooltip handle={handle}>
								<TooltipTrigger
									id="custom-mode-switch"
									handle={handle}
									render={
										<button
											type="button"
											onClick={() => handle.open("custom-mode-switch")}
										>
											<Switch
												defaultChecked={false}
												disabled
												checked={false}
												onCheckedChange={setIsChecked}
											/>
										</button>
									}
								/>

								<TooltipContent>
									{m["shortener.custom_mode_signin_hint"]()}
								</TooltipContent>
							</Tooltip>
						)}

						<FieldLabel htmlFor="custom-mode-switch">
							{m["shortener.custom_mode"]()}
						</FieldLabel>
					</Field>
				</CardAction>
			</CardHeader>
			<CardContent>
				<Activity mode={isChecked && isSignedIn ? "visible" : "hidden"}>
					<CustomModeForm onSuccess={onSuccess} />
				</Activity>
				<Activity mode={!isSignedIn || !isChecked ? "visible" : "hidden"}>
					<SimpleModeForm onSuccess={onSuccess} />
				</Activity>
			</CardContent>
		</Card>
	);
}
