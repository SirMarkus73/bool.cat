import { createFileRoute } from "@tanstack/react-router";
import { getSession } from "#/features/auth/server/session";
import { HeroSection } from "#/features/landing/components/heroSection";
import { TryTheProduct } from "#/features/landing/components/tryTheProduct";
import { UrlShortener } from "#/features/shortener/components/urlShortener";

export const Route = createFileRoute("/")({
	component: Home,
	loader: async () => {
		const session = await getSession();

		const isSignedIn = !!session;

		return { isSignedIn };
	},
});

function Home() {
	const { isSignedIn } = Route.useLoaderData();

	return (
		<main>
			{/* Actualmente hay un error con esto, siempre supone que el usuario no está autenticado. TODO: Arreglar este problema mas tarde */}
			<TryTheProduct />

			<section>
				<UrlShortener isSignedIn={isSignedIn} />
			</section>

			<HeroSection />
		</main>
	);
}
