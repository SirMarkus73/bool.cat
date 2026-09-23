import { ExternalLinkIcon } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import { m } from "#/paraglide/messages";

export function OpenShortUrlLink({ shortUrl }: { shortUrl: string }) {
	return (
		<a
			href={shortUrl}
			target="_blank"
			rel="noopener noreferrer"
			className={buttonVariants({ variant: "ghost", size: "sm" })}
		>
			<ExternalLinkIcon />
			{m["shortener.go_to_link"]()}
			<span className="sr-only">{m["shortener.showcase.opens_new_tab"]()}</span>
		</a>
	);
}
