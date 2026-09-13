import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "#/features/landing/components/heroSection";
import { TryTheProduct } from "#/features/landing/components/tryTheProduct";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main>
			{/* Actualmente hay un error con esto, siempre supone que el usuario no está autenticado. TODO: Arreglar este problema mas tarde */}
			<TryTheProduct />
			<HeroSection />
		</main>
	);
}
