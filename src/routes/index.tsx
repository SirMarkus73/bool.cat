import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSession } from "#/features/auth/server/session";
import { HeroSection } from "#/features/landing/components/heroSection";
import { TryTheProduct } from "#/features/landing/components/tryTheProduct";
import { PreviewShortUrlDialog } from "#/features/shortener/components/previewShortUrlDialog";
import { UrlShortener } from "#/features/shortener/components/urlShortener";

const searchParamSchema = z.object({
	preview: z.string().optional(),
});

export const Route = createFileRoute("/")({
	component: Home,
	validateSearch: searchParamSchema,
	loader: async () => {
		const session = await getSession();

		const isSignedIn = !!session;

		return { isSignedIn };
	},
});

function Home() {
	const { isSignedIn } = Route.useLoaderData();
	const { preview } = Route.useSearch();
	const navigate = Route.useNavigate();

	return (
		<main>
			{/* Actualmente hay un error con esto, siempre supone que el usuario no está autenticado. TODO: Arreglar este problema mas tarde */}
			<TryTheProduct />

			<section>
				<UrlShortener
					isSignedIn={isSignedIn}
					onSuccess={(slug) =>
						navigate({ search: (old) => ({ ...old, preview: slug }) })
					}
				/>
			</section>

			<HeroSection />

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
