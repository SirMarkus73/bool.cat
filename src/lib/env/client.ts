import { z } from "zod";

export const clientEnvSchema = z.object({
	VITE_SIMPLE_SHORT_URL_EXPIRATION_HOURS: z.coerce.number().default(24),
});

export const serverEnv = clientEnvSchema.parse(import.meta.env);
