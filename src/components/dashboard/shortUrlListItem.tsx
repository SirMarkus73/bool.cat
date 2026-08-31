import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { formatDistanceToNow } from "date-fns";
import { ExternalLinkIcon } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import { getUserDateLocale } from "#/lib/getUserDateLocale";
import { m } from "#/paraglide/messages";
import type { ShortUrl } from "#/types/shortUrl";
import { Badge } from "../ui/badge";
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
	const locale = getUserDateLocale();

	return (
		<Item id={shortUrl.slug} className="relative">
			<ItemContent>
				<ItemTitle>
					{getShortUrl(shortUrl.slug)}

					{shortUrl.expirationDate < new Date() ? (
						<Badge variant="destructive">{m.expired()}</Badge>
					) : (
						<Badge>
							{m.expiration()}{" "}
							{formatDistanceToNow(shortUrl.expirationDate, {
								addSuffix: true,
								locale,
							})}
						</Badge>
					)}
				</ItemTitle>
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
