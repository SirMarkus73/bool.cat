import { ClientOnly } from "@tanstack/react-router";
import { DicesIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { Button } from "#/components/ui/button";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "#/components/ui/field";
import {
	InputGroup,
	InputGroupAddon,
	InputGroupInput,
} from "#/components/ui/input-group";
import { Skeleton } from "#/components/ui/skeleton";
import { withForm } from "#/features/appForm/hooks/useAppForm";
import { getSlugSegments, slugify } from "#/features/shortener/lib/slugify";
import { m } from "#/paraglide/messages";
import { customModeFormOptions } from "./customModeFormOptions";

export const CustomSlugInput = withForm({
	...customModeFormOptions,
	render: ({ form }) => (
		<form.AppField name="slug">
			{(field) => {
				const isError = field.state.meta.errors.length > 0;
				const isDirty = field.state.meta.isDirty;
				const value = field.state.value;
				const changes = value
					? getSlugSegments(value).filter(
							(segment) => segment.kind === "changed",
						)
					: [];

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
									value={value}
									onChange={(e) => field.handleChange(e.target.value)}
									placeholder="your-slug"
									aria-invalid={isError}
								/>
								<InputGroupAddon align="inline-end">
									<Button
										variant="ghost"
										onClick={() => {
											const newSlug = nanoid(6);
											field.handleChange(newSlug);
										}}
									>
										<DicesIcon />
									</Button>
								</InputGroupAddon>
							</InputGroup>
						</ClientOnly>
						<ClientOnly
							fallback={
								<FieldDescription>{m["shortener.preview"]()}</FieldDescription>
							}
						>
							{value && (
								<FieldDescription className="flex flex-col gap-1">
									<span className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0.5">
										<span>{m["shortener.preview"]()}</span>
										<span className="break-all rounded-md bg-muted px-1.5 py-0.5 font-mono text-xs text-foreground">
											<span className="text-muted-foreground">
												{window.location.origin}/
											</span>
											{slugify(value)}
										</span>
									</span>
									{changes.length > 0 && (
										<span className="flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
											<span>{m["shortener.preview_changed"]()}</span>
											{changes.map((segment) => (
												<span
													key={segment.id}
													className="inline-flex items-center gap-1 font-mono"
												>
													<span
														className="text-destructive line-through decoration-2"
														title="Removed"
													>
														{segment.removed}
													</span>
													<span aria-hidden="true">→</span>
													<span className="text-primary" title="Added">
														{segment.added}
													</span>
												</span>
											))}
										</span>
									)}
								</FieldDescription>
							)}
						</ClientOnly>
						{isDirty && isError && (
							<FieldError>
								{typeof field.state.meta.errors[0] === "string"
									? field.state.meta.errors[0]
									: field.state.meta.errors[0]?.message || "Error desconocido"}
							</FieldError>
						)}
					</Field>
				);
			}}
		</form.AppField>
	),
});
