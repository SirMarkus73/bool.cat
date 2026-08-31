import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { SearchIcon } from "lucide-react";
import { useState } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
	InputGroupText,
} from "#/components/ui/input-group";
import { ScrollArea } from "#/components/ui/scroll-area";
import { Skeleton } from "#/components/ui/skeleton";
import { createListUrlsQuery } from "#/features/url/query/list";
import { cn } from "#/lib/utils";
import { m } from "#/paraglide/messages";
import { ShortUrlListItem } from "./shortUrlListItem";

type Props = {
	className?: string;
};

export function ShortUrlList({ className }: Props) {
	const [search, setSearch] = useState("");

	const {
		data: urls,
		isLoading,
		isError,
	} = useQuery({
		...createListUrlsQuery({ q: search }),
		placeholderData: keepPreviousData,
	});

	if (isLoading) {
		return (
			<Skeleton className={cn("rounded-md border border-border", className)} />
		);
	}

	if (isError) {
		return (
			<div className={cn("rounded-md border border-border p-4", className)}>
				<p className="text-sm text-destructive">
					{m["dashboard.fetch_links_error"]()}
				</p>
			</div>
		);
	}

	if (!urls || urls.length === 0) {
		return (
			<div className={cn("rounded-md border border-border", className)}>
				<InputGroup>
					<InputGroupInput
						placeholder="Search..."
						value={search}
						onChange={(e) => setSearch(e.target.value.trim())}
					/>
					<InputGroupAddon>
						<SearchIcon />
					</InputGroupAddon>
					<InputGroupAddon align="inline-end">
						<InputGroupText>0 links</InputGroupText>
					</InputGroupAddon>
				</InputGroup>
				<p className="text-sm text-muted-foreground p-6">
					{search ? m["dashboard.no_links_found"]() : m["dashboard.no_links"]()}
				</p>
			</div>
		);
	}

	return (
		<div
			className={cn(
				"rounded-md border border-border flex flex-col gap-2",
				className,
			)}
		>
			<InputGroup>
				<InputGroupInput
					placeholder="Search..."
					value={search}
					onChange={(e) => setSearch(e.target.value.trim())}
				/>
				<InputGroupAddon>
					<SearchIcon />
				</InputGroupAddon>
				<InputGroupAddon align="inline-end">
					<InputGroupText>
						{urls.length} {urls.length === 1 ? "link" : "links"}
					</InputGroupText>
				</InputGroupAddon>
			</InputGroup>
			<ScrollArea className="min-h-0">
				<ul className="flex flex-col gap-2 px-2 *:border-b *:border-border *:last:border-b-0">
					{urls?.map((url) => (
						<li key={url.id}>
							<ShortUrlListItem shortUrl={url} />
						</li>
					))}
				</ul>
			</ScrollArea>
		</div>
	);
}
