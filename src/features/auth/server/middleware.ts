import { createMiddleware } from "@tanstack/react-start";
import { getSession } from "#/features/auth/server/session";

export const ensureAuthenticated = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
	const session = await getSession();

	if (!session) {
		throw new Error("User is not authenticated");
	}

	return await next({
		context: {
			user: session.user,
		},
	});
});
