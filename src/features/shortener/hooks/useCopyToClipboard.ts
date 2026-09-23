import { useMutation } from "@tanstack/react-query";
import { useEffect, useRef, useState } from "react";

const COPIED_RESET_DELAY_MS = 3000;

/**
 * Wraps a clipboard write with pending/copied/error state. `isCopied` resets
 * itself after a short delay, and repeated calls are ignored while a copy is
 * in progress or still being confirmed.
 */
export function useCopyToClipboard(write: () => Promise<void>) {
	const [isCopied, setIsCopied] = useState(false);
	const resetTimeoutRef = useRef<ReturnType<typeof setTimeout>>(null);

	useEffect(() => {
		return () => {
			if (resetTimeoutRef.current) clearTimeout(resetTimeoutRef.current);
		};
	}, []);

	const { mutate, error, isPending, reset } = useMutation({
		mutationFn: write,
		onSuccess: () => {
			setIsCopied(true);
			resetTimeoutRef.current = setTimeout(() => {
				setIsCopied(false);
				resetTimeoutRef.current = null;
			}, COPIED_RESET_DELAY_MS);
		},
	});

	const copy = () => {
		if (isPending || isCopied) return;
		reset();
		mutate();
	};

	return { copy, error, isCopying: isPending, isCopied };
}
