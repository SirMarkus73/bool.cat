import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "#/components/ui/card";
import { Skeleton } from "#/components/ui/skeleton";
import { createListUrlsQuery } from "#/features/dashboard/query/list";
import { m } from "#/paraglide/messages";

export function DashboardStats() {
	const { data: urls, isLoading, isError } = useQuery(createListUrlsQuery({}));

	if (isError) {
		return null;
	}

	if (isLoading || !urls) {
		return (
			<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
				<Skeleton className="h-16 rounded-xl" />
				<Skeleton className="h-16 rounded-xl" />
				<Skeleton className="h-16 rounded-xl" />
			</div>
		);
	}

	const now = new Date();
	const active = urls.filter((url) => url.expirationDate > now).length;
	const expired = urls.length - active;

	const stats = [
		{ label: m["dashboard.total_links"](), value: urls.length },
		{ label: m["dashboard.active_links"](), value: active },
		{ label: m.expired(), value: expired },
	];

	return (
		<div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
			{stats.map((stat) => (
				<Card key={stat.label} size="sm">
					<CardContent className="flex items-baseline justify-between">
						<span className="text-sm text-muted-foreground">{stat.label}</span>
						<span className="font-heading text-3xl font-semibold tabular-nums">
							{stat.value}
						</span>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
