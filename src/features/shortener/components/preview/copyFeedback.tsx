type CopyFeedbackProps = {
	isCopied: boolean;
	copiedMessage: string;
	error: Error | null;
};

/**
 * Announces copy results to assistive tech. Both regions are always mounted so
 * screen readers pick up their content changes; errors are also shown visually.
 */
export function CopyFeedback({
	isCopied,
	copiedMessage,
	error,
}: CopyFeedbackProps) {
	return (
		<>
			<output className="sr-only">{isCopied ? copiedMessage : ""}</output>
			<p
				role="alert"
				className="text-center text-sm text-destructive empty:hidden"
			>
				{error?.message}
			</p>
		</>
	);
}
