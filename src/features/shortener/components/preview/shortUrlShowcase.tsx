import { ClientOnly } from "@tanstack/react-router";
import { Skeleton } from "#/components/ui/skeleton";
import { OpenShortUrlLink } from "#/features/shortener/components/preview/openShortUrlLink";
import { QrCodeCopyButton } from "#/features/shortener/components/preview/qrCodeCopyButton";
import { ShortUrlCopyField } from "#/features/shortener/components/preview/shortUrlCopyField";

export function ShortUrlShowcaseSkeleton() {
	return (
		<div
			aria-hidden
			className="flex flex-col items-center gap-5 rounded-xl bg-muted/60 px-4 pt-6 pb-4"
		>
			<Skeleton className="size-46 rounded-lg" />
			<Skeleton className="h-7 w-48" />
			<Skeleton className="h-7 w-28" />
		</div>
	);
}

// Reads `window.location`, so it must only render inside <ClientOnly>
function ShortUrlShowcaseContent({ slug }: { slug: string }) {
	const { origin, host } = window.location;
	const shortUrl = `${origin}/${slug}`;

	return (
		<div className="flex flex-col items-center gap-5 rounded-xl bg-muted/60 px-4 pt-6 pb-4">
			<QrCodeCopyButton shortUrl={shortUrl} />
			<ShortUrlCopyField shortUrl={shortUrl} host={host} slug={slug} />
			<OpenShortUrlLink shortUrl={shortUrl} />
		</div>
	);
}

export function ShortUrlShowcase({ slug }: { slug: string }) {
	return (
		<ClientOnly fallback={<ShortUrlShowcaseSkeleton />}>
			<ShortUrlShowcaseContent slug={slug} />
		</ClientOnly>
	);
}
