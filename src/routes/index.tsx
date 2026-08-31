import { createFileRoute } from "@tanstack/react-router";
import { HeroSection } from "#/features/landing/components/heroSection";
import { TryTheProduct } from "#/features/landing/components/tryTheProduct";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main>
			<TryTheProduct />
			<HeroSection />
		</main>
	);
}
