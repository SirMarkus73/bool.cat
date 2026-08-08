import { useQuery } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { ExternalLinkIcon } from "lucide-react";
import { ShortUrlList } from "#/components/dashboard/shortUrlList";
import { buttonVariants } from "#/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "#/components/ui/item";
import { ScrollArea } from "#/components/ui/scroll-area";
import { urlsQuery } from "#/lib/query/url/getUserUrls";
import { getSession } from "#/lib/server/auth/getSession";
import { m } from "#/paraglide/messages";

export const Route = createFileRoute("/app/")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getSession();

		if (!session) {
			throw redirect({ to: "/app/auth" });
		}

		return { user: session.user };
	},
});

function RouteComponent() {
	return (
		<main className="mx-4 my-6">
			<h1 className="text-2xl font-bold">{m["dashboard.title"]()}</h1>

			<section>
				<h2 className="text-xl font-semibold">{m["dashboard.links"]()}</h2>
				<ShortUrlList className="h-72" />
			</section>
		</main>
	);
}
