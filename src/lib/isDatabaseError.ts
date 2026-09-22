import { DrizzleQueryError } from "drizzle-orm";
import pg from "pg";

export function isDatabaseError(
	error: unknown,
): error is DrizzleQueryError & { cause: pg.DatabaseError } {
	if (
		error instanceof DrizzleQueryError &&
		error.cause instanceof pg.DatabaseError
	) {
		return true;
	}

	return false;
}
