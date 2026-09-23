import { CopyCheckIcon, CopyIcon } from "lucide-react";
import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import {
	Tooltip,
	TooltipContent,
	TooltipTrigger,
} from "#/components/ui/tooltip";
import { CopyFeedback } from "#/features/shortener/components/preview/copyFeedback";
import { useCopyToClipboard } from "#/features/shortener/hooks/useCopyToClipboard";
import { m } from "#/paraglide/messages";

async function copyText(text: string) {
	if (!navigator.clipboard) {
		throw new Error(m["shortener.showcase.clipboard_unsupported"]());
	}

	try {
		await navigator.clipboard.writeText(text);
	} catch {
		throw new Error(m["shortener.copy_error"]());
	}
}

type CopyButtonStateProps = {
	isCopying: boolean;
	isCopied: boolean;
};

function CopyButtonIcon({ isCopying, isCopied }: CopyButtonStateProps) {
	if (isCopying) return <Spinner aria-hidden />;
	if (isCopied) return <CopyCheckIcon />;
	return <CopyIcon />;
}

function copyButtonLabel({ isCopying, isCopied }: CopyButtonStateProps) {
	if (isCopying) return m["shortener.showcase.copying_short_url"]();
	if (isCopied) return m["shortener.showcase.short_url_copied"]();
	return m["shortener.copy_link"]();
}

type ShortUrlCopyFieldProps = {
	shortUrl: string;
	host: string;
	slug: string;
};

export function ShortUrlCopyField({
	shortUrl,
	host,
	slug,
}: ShortUrlCopyFieldProps) {
	const { copy, error, isCopying, isCopied } = useCopyToClipboard(() =>
		copyText(shortUrl),
	);

	const label = copyButtonLabel({ isCopying, isCopied });

	return (
		<div className="flex flex-col items-center gap-2">
			<div className="flex items-center gap-3">
				<p className="max-w-full text-center text-xl leading-tight tracking-tight break-all select-all">
					<span className="text-muted-foreground">{host}/</span>
					<span className="font-semibold text-primary">{slug}</span>
				</p>
				<Tooltip>
					<TooltipTrigger
						render={
							<Button
								type="button"
								size="icon"
								// Stable name; state changes are announced by CopyFeedback
								aria-label={m["shortener.copy_link"]()}
								// Kept focusable while busy so keyboard focus isn't dropped
								aria-disabled={isCopying || isCopied}
								onClick={copy}
							/>
						}
					>
						<CopyButtonIcon isCopying={isCopying} isCopied={isCopied} />
					</TooltipTrigger>
					<TooltipContent>{label}</TooltipContent>
				</Tooltip>
			</div>

			<CopyFeedback
				isCopied={isCopied}
				copiedMessage={m["shortener.showcase.short_url_copied"]()}
				error={error}
			/>
		</div>
	);
}
