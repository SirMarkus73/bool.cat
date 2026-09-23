import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";
import { m } from "#/paraglide/messages";

export function CtaSection() {
	return (
		<section className="px-6 py-20">
			<Card className="mx-auto max-w-3xl rounded-2xl bg-linear-to-br from-primary/10 via-card to-primary/5 py-16 text-base ring-primary/15 dark:from-primary/20 dark:via-primary/10 dark:to-background dark:ring-foreground/10">
				<CardContent className="flex flex-col items-center gap-4 px-6 text-center">
					<h2 className="text-3xl lg:text-4xl font-bold text-balance">
						{m["landing.cta.title"]()}
					</h2>
					<p className="max-w-xl text-muted-foreground text-pretty">
						{m["landing.cta.description"]()}
					</p>
					<Link
						to="/app/auth"
						className={buttonVariants({ variant: "default", size: "lg" })}
					>
						{m["landing.cta.button"]()}
						<ArrowRight />
					</Link>
				</CardContent>
			</Card>
		</section>
	);
}
