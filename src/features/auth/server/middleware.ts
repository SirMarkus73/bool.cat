import { createMiddleware } from "@tanstack/react-start";
import { getSession } from "#/features/auth/server/session";
import type { ApiResponse } from "#/interfaces/api";

type SessionUser = NonNullable<Awaited<ReturnType<typeof getSession>>>["user"];

export type AuthContext = ApiResponse<{ user: SessionUser }>;

export const withAuthContext = createMiddleware({
	type: "function",
}).server(async ({ next }) => {
	const session = await getSession();

	const auth: AuthContext = session
		? { success: true, data: { user: session.user } }
		: {
				success: false,
				type: "auth",
				message: "User is not authenticated",
			};

	return await next({
		context: { auth },
	});
});
