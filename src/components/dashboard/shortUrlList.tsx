import { useSuspenseQuery } from "@tanstack/react-query";
import { Suspense } from "react";
import { ScrollArea } from "#/components/ui/scroll-area";
import { urlsQuery } from "#/lib/query/url/getUserUrls";
import { cn } from "#/lib/utils";
import { Skeleton } from "../ui/skeleton";
import { ShortUrlListItem } from "./shortUrlListItem";

type Props = {
	className?: string;
};

function ShortUrlListInner({ className }: Props) {
	const { data: urls } = useSuspenseQuery(urlsQuery);

	return (
		<ScrollArea className={cn("rounded-md border border-border", className)}>
			<ul className="flex flex-col gap-2 px-2 *:border-b *:border-border *:last:border-b-0">
				{urls?.map((url) => (
					<li key={url.id}>
						<ShortUrlListItem shortUrl={url} />
					</li>
				))}
			</ul>
		</ScrollArea>
	);
}

export function ShortUrlList({ className }: Props) {
	return (
		<Suspense
			fallback={
				<Skeleton
					className={cn("rounded-md border border-border", className)}
				/>
			}
		>
			<ShortUrlListInner className={className} />
		</Suspense>
	);
}
