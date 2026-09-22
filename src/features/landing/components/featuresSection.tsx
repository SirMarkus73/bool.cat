import { BarChart3, Clock, Link2, Zap } from "lucide-react";
import type { ReactNode } from "react";
import { Card, CardContent } from "#/components/ui/card";
import { m } from "#/paraglide/messages";

type FeatureCardProps = {
	icon: ReactNode;
	title: string;
	description: string;
};

function FeatureCard({ icon, title, description }: FeatureCardProps) {
	return (
		<Card>
			<CardContent className="flex flex-col gap-3">
				<div className="flex size-10 items-center justify-center rounded-lg bg-primary/15 text-primary">
					{icon}
				</div>
				<h3 className="font-heading text-lg font-semibold">{title}</h3>
				<p className="text-sm text-muted-foreground text-pretty">
					{description}
				</p>
			</CardContent>
		</Card>
	);
}

export function FeaturesSection() {
	return (
		<section className="px-6 py-20 mx-auto max-w-6xl">
			<div className="flex flex-col gap-2 text-center mb-12">
				<span className="text-sm font-medium text-primary">
					{m["landing.features.eyebrow"]()}
				</span>
				<h2 className="text-3xl lg:text-4xl font-bold text-balance">
					{m["landing.features.title"]()}
				</h2>
				<p className="text-muted-foreground text-pretty">
					{m["landing.features.subtitle"]()}
				</p>
			</div>

			<div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
				<FeatureCard
					icon={<Zap className="size-5" />}
					title={m["landing.features.fast_title"]()}
					description={m["landing.features.fast_description"]()}
				/>
				<FeatureCard
					icon={<Link2 className="size-5" />}
					title={m["landing.features.custom_title"]()}
					description={m["landing.features.custom_description"]()}
				/>
				<FeatureCard
					icon={<BarChart3 className="size-5" />}
					title={m["landing.features.analytics_title"]()}
					description={m["landing.features.analytics_description"]()}
				/>
				<FeatureCard
					icon={<Clock className="size-5" />}
					title={m["landing.features.expiration_title"]()}
					description={m["landing.features.expiration_description"]()}
				/>
			</div>
		</section>
	);
}
