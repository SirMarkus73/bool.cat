import { formOptions } from "@tanstack/react-form";
import { redirect } from "@tanstack/react-router";
import { z } from "zod";
import { authClient } from "#/lib/auth-client";

const formSchema = z.object({
	email: z
		.email("Correo electrónico inválido")
		.min(1, "Correo electrónico es requerido"),
	password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

const defaultValues: z.infer<typeof formSchema> = {
	email: "",
	password: "",
};

export const loginFormOptions = formOptions({
	defaultValues,
	validators: {
		onChange: formSchema,
	},
});
