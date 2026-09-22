import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import { m } from "#/paraglide/messages";

export function CtaSection() {
	return (
		<section className="px-6 py-20">
			<div className="mx-auto flex max-w-3xl flex-col items-center gap-4 rounded-2xl bg-linear-to-br from-primary/20 via-primary/10 to-background px-6 py-16 text-center ring-1 ring-foreground/10">
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
			</div>
		</section>
	);
}
