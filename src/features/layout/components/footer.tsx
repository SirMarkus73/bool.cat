import { Link } from "@tanstack/react-router";
import { ExternalLink } from "lucide-react";
import { m } from "#/paraglide/messages";

export function Footer() {
	return (
		<footer className="border-t px-6 py-8">
			<div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
				<div className="flex flex-col items-center gap-1 md:items-start">
					<Link to="/app" className="text-lg font-bold text-foreground">
						bool.cat
					</Link>
					<span>{m["layout.footer.tagline"]()}</span>
				</div>

				<div className="flex items-center gap-6">
					<a
						href="https://github.com/SirMarkus73/bool.cat"
						target="_blank"
						rel="noreferrer"
						className="flex items-center gap-1 hover:text-foreground"
					>
						{m["layout.footer.source_code"]()}
						<ExternalLink className="size-3.5" />
					</a>
					<span>
						© {new Date().getFullYear()} bool.cat —{" "}
						{m["layout.footer.rights"]()}
					</span>
				</div>
			</div>
		</footer>
	);
}
