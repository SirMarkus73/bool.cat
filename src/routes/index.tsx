import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "#/components/landing/heroSection";
import { TryTheProduct } from "#/components/landing/tryTheProduct";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main>
			<HeroSection />
			<TryTheProduct />
		</main>
	);
}
