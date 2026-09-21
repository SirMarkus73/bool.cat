import { ClientOnly } from "@tanstack/react-router";
import { ClipboardCheckIcon, ClipboardIcon } from "lucide-react";
import { useRef, useState } from "react";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { Skeleton } from "#/components/ui/skeleton";

type ShortUrlResultProps = {
	slug: string;
	id?: string;
};

export function ShortUrlResult({ slug, id }: ShortUrlResultProps) {
	const resultRef = useRef<HTMLInputElement>(null);
	const [isCopied, setIsCopied] = useState(false);

	return (
		<ClientOnly fallback={<Skeleton className="h-8 w-full rounded-lg" />}>
			<InputGroup
				onClick={async (e) => {
					e.preventDefault();
					resultRef.current?.select();
					if (isCopied) return;

					await navigator.clipboard.writeText(
						`${window.location.origin}/${slug}`,
					);
					setIsCopied(true);

					setTimeout(() => {
						setIsCopied(false);
					}, 2000);
				}}
			>
				<InputGroupInput
					ref={resultRef}
					name="shortened-url"
					id={id}
					className="select-all"
					value={`${window.location.origin}/${slug}`}
					readOnly
					role="status"
				/>
				<InputGroupAddon align="inline-end">
					{isCopied ? <ClipboardCheckIcon /> : <ClipboardIcon />}
				</InputGroupAddon>
			</InputGroup>
		</ClientOnly>
	);
}
