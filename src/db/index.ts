import { drizzle } from "drizzle-orm/node-postgres";
import { relations } from "./relations";

export const db = drizzle({
	// biome-ignore lint/style/noNonNullAssertion: We are sure that the DATABASE_URL environment variable is set, so we can safely use the non-null assertion operator here.
	connection: process.env.DATABASE_URL!,
	relations,
});
