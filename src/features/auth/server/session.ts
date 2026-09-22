import { createServerFn } from "@tanstack/react-start";
import { getRequestHeaders } from "@tanstack/react-start/server";
import { auth } from "#/features/auth/lib/auth";

export const getSession = createServerFn({ method: "GET" }).handler(
	async () => {
		const headers = getRequestHeaders();
		const session = await auth.api.getSession({ headers });
		return session;
	},
);

export const listSessions = createServerFn({ method: "GET" }).handler(
	async () => {
		const headers = getRequestHeaders();
		const sessions = await auth.api.listSessions({ headers });
		return sessions;
	},
);
