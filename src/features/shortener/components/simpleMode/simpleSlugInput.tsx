import { useMutation } from "@tanstack/react-query";
import { ClientOnly } from "@tanstack/react-router";
import { DicesIcon } from "lucide-react";
import { useEffect, useRef } from "react";
import { Button } from "#/components/ui/button";
import { Field, FieldError, FieldLabel } from "#/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { Skeleton } from "#/components/ui/skeleton";
import { Spinner } from "#/components/ui/spinner";
import { withForm } from "#/features/appForm/hooks/useAppForm";
import { getRandomSlugToken } from "#/features/shortener/serverFn/getRandomSlugToken";
import { simpleModeFormOptions } from "./simpleModeFormOptions";

export const SimpleSlugInput = withForm({
	...simpleModeFormOptions,
	render: ({ form }) => {
		const { mutate, isPending, data } = useMutation({
			mutationFn: () => getRandomSlugToken(),
		});

		const hasGeneratedRef = useRef(false);

		useEffect(() => {
			if (hasGeneratedRef.current) return;
			hasGeneratedRef.current = true;
			mutate();
		}, [mutate]);

		useEffect(() => {
			if (data?.success) {
				const { slug, slugToken } = data.data;

				form.setFieldValue("slugField", { slug, slugToken });
			}
		}, [data, form.setFieldValue]);

		return (
			<form.AppField
				name="slugField"
				validators={{
					onSubmit: (): string | undefined => undefined,
				}}
			>
				{(field) => {
					const isError = field.state.meta.errors.length > 0;
					const isDirty = field.state.meta.isDirty;
					const value = field.state.value;

					return (
						<Field data-invalid={isError}>
							<ClientOnly fallback={<span>Slug</span>}>
								<FieldLabel htmlFor={field.name}>Slug</FieldLabel>
							</ClientOnly>
							<ClientOnly
								fallback={<Skeleton className="h-8 w-full rounded-lg" />}
							>
								<InputGroup>
									<InputGroupAddon align="inline-start">
										<span>{window.location.origin}/</span>
									</InputGroupAddon>
									<InputGroupInput
										id={field.name}
										name={field.name}
										value={value.slug}
										readOnly
										placeholder="your-slug"
										aria-invalid={isError}
										className="cursor-not-allowed"
									/>
									<InputGroupAddon align="inline-end">
										<Button
											variant="ghost"
											disabled={isPending}
											onClick={() => mutate()}
										>
											{isPending ? <Spinner /> : <DicesIcon />}
										</Button>
									</InputGroupAddon>
								</InputGroup>
							</ClientOnly>

							{isDirty && isError && (
								<FieldError>
									{typeof field.state.meta.errors[0] === "string"
										? field.state.meta.errors[0]
										: field.state.meta.errors[0]?.message ||
											"Error desconocido"}
								</FieldError>
							)}
						</Field>
					);
				}}
			</form.AppField>
		);
	},
});
