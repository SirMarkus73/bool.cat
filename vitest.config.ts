import { defineConfig } from "vitest/config";

export default defineConfig({
	resolve: { tsconfigPaths: true },
	test: {
		environment: "node",
		include: ["src/**/*.test.ts"],
		setupFiles: ["./src/test/setup.ts"],
		env: {
			NODE_ENV: "test",
			DATABASE_URL: "postgres://test:test@localhost:5432/test",
			BETTER_AUTH_SECRET: "test-better-auth-secret",
			BETTER_AUTH_URL: "http://localhost:3000",
			SMTP_HOST: "localhost",
			SMTP_PORT: "1025",
			SMTP_USER: "test",
			SMTP_PASSWORD: "test",
			JWT_SECRET: "test-jwt-secret",
		},
	},
});
