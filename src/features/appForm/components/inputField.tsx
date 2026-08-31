import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import { Input } from "#/components/ui/input";
import { useFieldContext } from "#/features/appForm/hooks/useAppForm";

type Props = {
	label: string;
} & Omit<
	React.ComponentProps<typeof Input>,
	"id" | "name" | "value" | "onChange"
>;

export function InputField({ label, ...inputProps }: Props) {
	const field = useFieldContext<string>();

	const isError = field.state.meta.errors.length > 0;
	const isDirty = field.state.meta.isDirty;

	return (
		<Field data-invalid={isError}>
			<FieldLabel htmlFor={field.name}>{label}</FieldLabel>
			<Input
				id={field.name}
				name={field.name}
				value={field.state.value}
				onChange={(e) => field.handleChange(e.target.value)}
				{...inputProps}
				aria-invalid={isError}
			/>
			{isDirty && isError && (
				<FieldError>
					{typeof field.state.meta.errors[0] === "string"
						? field.state.meta.errors[0]
						: field.state.meta.errors[0]?.message || "Error desconocido"}
				</FieldError>
			)}{" "}
		</Field>
	);
}
