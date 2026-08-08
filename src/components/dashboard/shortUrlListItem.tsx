import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { ExternalLinkIcon } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import type { ShortUrl } from "#/types/shortUrl";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "../ui/item";

type Props = {
	shortUrl: ShortUrl;
};

const getShortUrl = createIsomorphicFn()
	.client((slug: ShortUrl["slug"]) => `${window.location.origin}/${slug}`)
	.server((slug: ShortUrl["slug"]) => {
		const requestUrl = getRequestUrl({
			xForwardedHost: true,
			xForwardedProto: true,
		});

		return `${requestUrl.origin}/${slug}`;
	});

export function ShortUrlListItem({ shortUrl }: Props) {
	return (
		<Item>
			<ItemContent>
				<ItemTitle>{getShortUrl(shortUrl.slug)}</ItemTitle>
				<ItemDescription>
					<a
						href={shortUrl.redirectUrl}
						target="_blank"
						rel="noopener noreferrer"
					>
						{shortUrl.redirectUrl}
					</a>
				</ItemDescription>
			</ItemContent>
			<ItemActions>
				<a
					href={shortUrl.redirectUrl}
					target="_blank"
					rel="noopener noreferrer"
					className={buttonVariants({
						variant: "ghost",
						size: "icon",
					})}
				>
					<ExternalLinkIcon />
				</a>
			</ItemActions>
		</Item>
	);
}
