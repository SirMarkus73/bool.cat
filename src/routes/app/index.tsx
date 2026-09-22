import { useQueryClient } from "@tanstack/react-query";
import { createFileRoute, redirect } from "@tanstack/react-router";
import { z } from "zod";
import { getSession } from "#/features/auth/server/session";
import { ShortUrlList } from "#/features/dashboard/components/shortUrlList";
import { listUrlsQuery } from "#/features/dashboard/query/list";
import { PreviewShortUrlDialog } from "#/features/shortener/components/previewShortUrlDialog";
import { UrlShortener } from "#/features/shortener/components/urlShortener";
import { m } from "#/paraglide/messages";

const searchParamSchema = z.object({
	preview: z.string().optional(),
});

export const Route = createFileRoute("/app/")({
	component: RouteComponent,
	validateSearch: searchParamSchema,
	beforeLoad: async () => {
		const session = await getSession();

		if (!session) {
			throw redirect({ to: "/app/auth" });
		}

		return { user: session.user };
	},
});

function RouteComponent() {
	const queryClient = useQueryClient();
	const navigate = Route.useNavigate();
	const { preview } = Route.useSearch();

	return (
		<main className="mx-4 my-6">
			<h1 className="text-2xl font-bold">{m["dashboard.title"]()}</h1>
			<div className="lg:grid-cols-3 lg:grid gap-5 lg:justify-center flex flex-col">
				<section className="lg:col-span-2">
					<h2 className="text-xl font-semibold">{m["dashboard.links"]()}</h2>
					<ShortUrlList className="h-96 lg:h-132 xl:h-180  " />
				</section>

				<section>
					<UrlShortener
						isSignedIn
						onSuccess={(slug) => {
							queryClient.invalidateQueries({
								queryKey: listUrlsQuery.queryKey,
							});
							navigate({ search: (old) => ({ ...old, preview: slug }) });
						}}
					/>
				</section>
			</div>

			<PreviewShortUrlDialog
				slug={preview}
				onOpenChange={(state) => {
					if (!state) {
						navigate({ search: (old) => ({ ...old, preview: undefined }) });
					}
				}}
			/>
		</main>
	);
}
