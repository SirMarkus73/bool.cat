import { PlusIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "#/components/ui/dialog";
import { UrlShortener } from "#/features/shortener/components/urlShortener";
import { m } from "#/paraglide/messages";

type Props = {
	onSuccess?: (slug: string) => void;
};

export function CreateShortUrlDialog({ onSuccess }: Props) {
	const [open, setOpen] = useState(false);

	return (
		<Dialog open={open} onOpenChange={setOpen}>
			<DialogTrigger render={<Button type="button" />}>
				<PlusIcon />
				{m["dashboard.create_link"]()}
			</DialogTrigger>
			<DialogContent className="sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="sr-only">
						{m["dashboard.create_link"]()}
					</DialogTitle>
				</DialogHeader>
				<UrlShortener
					isSignedIn
					className="m-0 ring-0"
					onSuccess={(slug) => {
						setOpen(false);
						onSuccess?.(slug);
					}}
				/>
			</DialogContent>
		</Dialog>
	);
}
