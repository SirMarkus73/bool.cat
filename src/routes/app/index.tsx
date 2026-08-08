import { createFileRoute, redirect } from "@tanstack/react-router";
import { ExternalLinkIcon } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";

import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemTitle,
} from "#/components/ui/item";
import { ScrollArea } from "#/components/ui/scroll-area";
import { getSession } from "#/lib/server/auth/getSession";
import { getUserUrls } from "#/lib/server/url/getUserUrls";
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
	loader: async () => {
		const urls = await getUserUrls({ data: {} });
		return { urls };
	},
});

function RouteComponent() {
	const { urls } = Route.useLoaderData();

	return (
		<main className="mx-4 my-6">
			<h1 className="text-2xl font-bold">{m["dashboard.title"]()}</h1>

			<section>
				<h2 className="text-xl font-semibold">{m["dashboard.links"]()}</h2>
				<ScrollArea className="h-72  rounded-md border border-border">
					<ul>
						<li>
							{urls.map((url) => (
								<Item key={url.id}>
									<ItemContent>
										<ItemTitle>{url.slug}</ItemTitle>
										<ItemDescription>
											<a
												href={url.redirectUrl}
												target="_blank"
												rel="noopener noreferrer"
											>
												{url.redirectUrl}
											</a>
										</ItemDescription>
									</ItemContent>
									<ItemActions>
										<a
											href={url.redirectUrl}
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
							))}
						</li>
					</ul>
				</ScrollArea>
			</section>
		</main>
	);
}
