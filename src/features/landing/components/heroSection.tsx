import logoIcon from "#/assets/logo/boolcat-icon-color.svg";
import logoIconDarkMode from "#/assets/logo/boolcat-icon-reversed.svg";
import { UrlShortener } from "#/features/shortener/components/urlShortener";
import { m } from "#/paraglide/messages";

type HeroSectionProps = {
	isSignedIn?: boolean;
	onSuccess?: (slug: string) => void;
};

export function HeroSection({ isSignedIn, onSuccess }: HeroSectionProps) {
	return (
		<div className="relative flex flex-col items-center gap-10 overflow-hidden px-6 py-24 text-center lg:py-32">
			{/* light: dot grid fading out from the top */}
			<div
				aria-hidden
				className="absolute inset-0 bg-[radial-gradient(currentColor_1px,transparent_1px)] bg-size-[22px_22px] text-primary/25 mask-[radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)] dark:hidden"
			/>
			{/* dark: soft glow behind the heading */}
			<div
				aria-hidden
				className="absolute top-16 hidden size-136 rounded-full bg-primary/35 blur-3xl dark:block"
			/>

			<div className="relative flex flex-col items-center gap-4">
				<img src={logoIcon} alt="" className="size-14 lg:size-16 dark:hidden" />
				<img
					src={logoIconDarkMode}
					alt=""
					className="hidden size-14 lg:size-16 dark:block"
				/>
				<h1 className="text-5xl font-bold leading-[0.95] tracking-tight text-balance lg:text-7xl">
					{m["landing.short_links"]()}
					<br />
					{m["landing.true_simplicity"]()}
				</h1>
				<p className="max-w-lg text-lg text-muted-foreground text-pretty">
					{m["landing.app_description"]({ app_name: "bool.cat" })}
				</p>
			</div>

			<div className="relative w-full max-w-xl text-left">
				<UrlShortener isSignedIn={isSignedIn} onSuccess={onSuccess} />
			</div>
		</div>
	);
}
