import { useQuery } from "@tanstack/react-query";
import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { Skeleton } from "#/components/ui/skeleton";
import { Spinner } from "#/components/ui/spinner";
import { CopyFeedback } from "#/features/shortener/components/preview/copyFeedback";
import { useCopyToClipboard } from "#/features/shortener/hooks/useCopyToClipboard";
import { createBrandedQrCode } from "#/features/shortener/lib/brandedQrCode";
import { m } from "#/paraglide/messages";

async function copyPngDataUrl(dataUrl: string) {
	if (!navigator.clipboard) {
		throw new Error(m["shortener.showcase.clipboard_unsupported"]());
	}
	if (!ClipboardItem.supports("image/png")) {
		throw new Error(m["shortener.showcase.clipboard_image_unsupported"]());
	}

	try {
		// The QR is a data URL, so it has to be decoded into a real PNG blob
		await navigator.clipboard.write([
			new ClipboardItem({
				"image/png": fetch(dataUrl).then((res) => res.blob()),
			}),
		]);
	} catch {
		throw new Error(m["shortener.showcase.copy_qr_error"]());
	}
}

function QrCodeOverlayContent({
	isCopying,
	isCopied,
}: {
	isCopying: boolean;
	isCopied: boolean;
}) {
	if (isCopying) {
		return (
			<>
				<Spinner aria-hidden />
				{m["shortener.showcase.copying_qr"]()}
			</>
		);
	}

	if (isCopied) {
		return (
			<>
				<CopyCheckIcon className="size-5" />
				{m["shortener.showcase.qr_copied"]()}
			</>
		);
	}

	return (
		<>
			<CopyIcon className="size-5" />
			{m["shortener.showcase.copy_qr"]()}
		</>
	);
}

export function QrCodeCopyButton({ shortUrl }: { shortUrl: string }) {
	const { data: qr } = useQuery({
		queryKey: ["qrCode", shortUrl],
		queryFn: () => createBrandedQrCode(shortUrl),
	});

	const { copy, error, isCopying, isCopied } = useCopyToClipboard(async () => {
		if (qr) await copyPngDataUrl(qr);
	});

	const isBusy = isCopying || isCopied;

	return (
		<div className="flex flex-col items-center gap-2">
			{/* The QR tile stays white in dark mode so phone cameras can read it */}
			<button
				type="button"
				aria-label={m["shortener.showcase.copy_qr_for"]({ url: shortUrl })}
				// Kept focusable while unavailable so keyboard focus isn't dropped
				aria-disabled={!qr || isBusy}
				onClick={() => {
					if (qr) copy();
				}}
				data-busy={isBusy || undefined}
				className="group relative rounded-lg bg-white p-3 shadow-sm ring-1 ring-foreground outline-none focus-visible:ring-3 focus-visible:ring-ring aria-disabled:cursor-default"
			>
				{qr ? (
					<img src={qr} alt="" className="block size-40" />
				) : (
					<Skeleton className="size-40 rounded-md" />
				)}

				{qr && (
					<div
						aria-hidden
						className="absolute inset-0 flex size-full items-center justify-center gap-2 rounded-lg bg-black/80 text-sm font-semibold text-white opacity-0 transition-opacity group-hover:opacity-100 group-focus-visible:opacity-100 group-data-busy:opacity-100 motion-reduce:transition-none"
					>
						<QrCodeOverlayContent isCopying={isCopying} isCopied={isCopied} />
					</div>
				)}
			</button>

			<CopyFeedback
				isCopied={isCopied}
				copiedMessage={m["shortener.showcase.qr_copied"]()}
				error={error}
			/>
		</div>
	);
}
