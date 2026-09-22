import { Button } from "#/components/ui/button";
import { Spinner } from "#/components/ui/spinner";
import { useFormContext } from "#/features/appForm/hooks/useAppForm";

type Props = {
	label: string;
} & Omit<React.ComponentProps<typeof Button>, "type" | "form">;

export function SubmitButton({ label, disabled, ...props }: Props) {
	const form = useFormContext();

	return (
		<form.Subscribe
			selector={(state) => ({
				isSubmitting: state.isSubmitting,
				isValid: state.isValid,
				isValidating: state.isValidating,
			})}
		>
			{({ isSubmitting, isValid, isValidating }) => (
				<Button
					{...props}
					type="submit"
					form={form.formId}
					disabled={disabled || isSubmitting || !isValid || isValidating}
				>
					{isSubmitting}
					{isValid}
					{isValidating}

					{(isSubmitting || isValidating) && (
						<Spinner data-icon="inline-start" />
					)}
					{label}
				</Button>
			)}
		</form.Subscribe>
	);
}
