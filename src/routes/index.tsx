import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { getSession } from "#/features/auth/server/session";
import { CtaSection } from "#/features/landing/components/ctaSection";
import { FeaturesSection } from "#/features/landing/components/featuresSection";
import { HeroSection } from "#/features/landing/components/heroSection";
import { HowItWorksSection } from "#/features/landing/components/howItWorksSection";
import { PreviewShortUrlDialog } from "#/features/shortener/components/previewShortUrlDialog";

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
			<HeroSection
				isSignedIn={isSignedIn}
				onSuccess={(slug) =>
					navigate({ search: (old) => ({ ...old, preview: slug }) })
				}
			/>

			<FeaturesSection />

			<HowItWorksSection />

			<CtaSection />

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
