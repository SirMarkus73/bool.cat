import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSession } from "#/features/auth/server/session";
import { CreateShortUrlCard } from "#/features/url/components/form/createShortUrlCard";
import { ShortUrlList } from "#/features/url/components/shortUrlList";
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
			<div className="lg:grid-cols-3 lg:grid grid gap-5 lg:justify-center items-center">
				<section className="lg:col-span-2">
					<h2 className="text-xl font-semibold">{m["dashboard.links"]()}</h2>
					<ShortUrlList className="h-72" />
				</section>

				<section>
					<CreateShortUrlCard />
				</section>
			</div>
		</main>
	);
}
