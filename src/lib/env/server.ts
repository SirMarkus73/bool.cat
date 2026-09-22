import { z } from "zod";
import { clientEnvSchema } from "./client";

const serverEnvSchema = clientEnvSchema.extend({
	NODE_ENV: z.enum(["development", "production", "test"]),

	// Database configuration
	DATABASE_URL: z.string(),

	// Better Auth configuration
	BETTER_AUTH_SECRET: z.string(),
	BETTER_AUTH_URL: z.url(),

	// SMTP configuration
	SMTP_HOST: z.string(),
	SMTP_PORT: z.coerce.number(),
	SMTP_USER: z.string(),
	SMTP_PASSWORD: z.string(),

	// JWT configuration
	JWT_SECRET: z.string(),
});

export const serverEnv = serverEnvSchema.parse(process.env);
