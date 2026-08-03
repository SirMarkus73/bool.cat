import { formOptions } from "@tanstack/react-form";
import { z } from "zod";

const registerSchema = z.object({
	name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
	email: z
		.email("Correo electrónico inválido")
		.min(1, "Correo electrónico es requerido"),
	password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
	repeatPassword: z
		.string()
		.min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const registerFormOptions = formOptions({
	defaultValues: {
		name: "",
		email: "",
		password: "",
		repeatPassword: "",
	},

	validators: {
		onChange: registerSchema,
	},
});
