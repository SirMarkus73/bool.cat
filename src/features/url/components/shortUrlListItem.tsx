import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createIsomorphicFn } from "@tanstack/react-start";
import { getRequestUrl } from "@tanstack/react-start/server";
import { formatDistanceToNow } from "date-fns";
import { EllipsisIcon, ExternalLinkIcon, Trash2Icon } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuGroup,
	DropdownMenuItem,
	DropdownMenuLabel,
	DropdownMenuTrigger,
} from "#/components/ui/dropdown-menu";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "#/components/ui/item";
import type { ShortUrl } from "#/features/url/interfaces/shortUrl";
import { getUserDateLocale } from "#/lib/getUserDateLocale";
import { m } from "#/paraglide/messages";
import { listUrlsQuery } from "../query/list";
import { deleteShortUrl } from "../server/deleteShortUrl";

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
	const isExpired = shortUrl.expirationDate < new Date();
	const queryClient = useQueryClient();

	const { mutate, isPending } = useMutation({
		mutationFn: () => deleteShortUrl({ data: { slug: shortUrl.slug } }),
		onSettled: () => {
			queryClient.invalidateQueries({ queryKey: listUrlsQuery.queryKey });
		},
	});

	return (
		<Item
			id={shortUrl.slug}
			className={`relative ${isPending ? "opacity-50 animate-pulse" : ""} `}
		>
			<ItemContent>
				<ItemTitle>
					{getShortUrl(shortUrl.slug)}

					{isExpired ? (
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
				<DropdownMenu>
					<DropdownMenuTrigger
						render={
							<Button disabled={isPending} variant="outline" type="button" />
						}
					>
						<EllipsisIcon />
					</DropdownMenuTrigger>
					<DropdownMenuContent>
						<DropdownMenuGroup>
							<DropdownMenuLabel>{m.actions()}</DropdownMenuLabel>
							<DropdownMenuItem>
								<a
									href={shortUrl.redirectUrl}
									target="_blank"
									rel="noopener noreferrer"
									className="flex gap-2 items-center"
								>
									<ExternalLinkIcon /> {m["shortener.go_to_link"]()}
								</a>
							</DropdownMenuItem>
							<DropdownMenuItem variant="destructive">
								<button
									className="flex gap-2 items-center"
									type="button"
									onClick={() => mutate()}
									disabled={isPending}
								>
									<Trash2Icon /> {m["shortener.delete_link"]()}
								</button>
							</DropdownMenuItem>
						</DropdownMenuGroup>
					</DropdownMenuContent>
				</DropdownMenu>
			</ItemActions>
		</Item>
	);
}
