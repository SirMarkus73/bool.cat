import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from "@/components/ui/dialog";
import { ShortUrlResult } from "./shortUrlResult";

type PreviewShortUrlModalProps = {
	slug?: string;
	onOpenChange?: (open: boolean) => void;
};

export function PreviewShortUrlDialog({
	slug,
	onOpenChange,
}: PreviewShortUrlModalProps) {
	return (
		<Dialog open={!!slug} onOpenChange={onOpenChange}>
			<DialogContent>
				<DialogHeader>
					<DialogTitle>Your short url</DialogTitle>
					{slug && <ShortUrlResult slug={slug} />}
				</DialogHeader>
			</DialogContent>
		</Dialog>
	);
}
