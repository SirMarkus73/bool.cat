import type { ReactNode } from "react";
import { m } from "#/paraglide/messages";

type StepProps = {
	index: number;
	title: string;
	description: string;
};

function Step({ index, title, description }: StepProps) {
	return (
		<div className="flex flex-col items-center gap-3 text-center">
			<span className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-heading font-semibold">
				{index}
			</span>
			<h3 className="font-heading text-lg font-semibold">{title}</h3>
			<p className="text-sm text-muted-foreground text-pretty max-w-xs">
				{description}
			</p>
		</div>
	);
}

function StepConnector(): ReactNode {
	return (
		<div
			aria-hidden
			className="hidden md:block h-px flex-1 self-start mt-5 bg-border"
		/>
	);
}

export function HowItWorksSection() {
	return (
		<section className="px-6 py-20 bg-muted/40">
			<div className="mx-auto max-w-6xl">
				<div className="flex flex-col gap-2 text-center mb-12">
					<h2 className="text-3xl lg:text-4xl font-bold text-balance">
						{m["landing.how_it_works.title"]()}
					</h2>
					<p className="text-muted-foreground text-pretty">
						{m["landing.how_it_works.subtitle"]()}
					</p>
				</div>

				<div className="flex flex-col md:flex-row items-start gap-8 md:gap-4">
					<Step
						index={1}
						title={m["landing.how_it_works.step_1_title"]()}
						description={m["landing.how_it_works.step_1_description"]()}
					/>
					<StepConnector />
					<Step
						index={2}
						title={m["landing.how_it_works.step_2_title"]()}
						description={m["landing.how_it_works.step_2_description"]()}
					/>
					<StepConnector />
					<Step
						index={3}
						title={m["landing.how_it_works.step_3_title"]()}
						description={m["landing.how_it_works.step_3_description"]()}
					/>
				</div>
			</div>
		</section>
	);
}
