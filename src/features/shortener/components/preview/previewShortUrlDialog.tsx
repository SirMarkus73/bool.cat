import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from "#/components/ui/dialog";
import { ShortUrlShowcase } from "#/features/shortener/components/preview/shortUrlShowcase";
import { m } from "#/paraglide/messages";

type PreviewShortUrlModalProps = {
	slug?: string;
	onOpenChange?: (open: boolean) => void;
};

export function PreviewShortUrlDialog({
	slug,
	onOpenChange,
}: PreviewShortUrlModalProps) {
	if (!slug) return null;

	return (
		<Dialog open onOpenChange={onOpenChange}>
			<DialogContent className="gap-6 p-6 sm:max-w-md">
				<DialogHeader>
					<DialogTitle className="text-lg">
						{m["shortener.preview_dialog.title"]()}
					</DialogTitle>
					<DialogDescription>
						{m["shortener.preview_dialog.description"]()}
					</DialogDescription>
				</DialogHeader>

				<ShortUrlShowcase slug={slug} />
			</DialogContent>
		</Dialog>
	);
}
