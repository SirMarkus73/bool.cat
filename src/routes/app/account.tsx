import { createFileRoute, redirect } from "@tanstack/react-router";
import { Card, CardContent, CardHeader, CardTitle } from "#/components/ui/card";

import { Separator } from "#/components/ui/separator";
import { SessionList } from "#/features/account/components/session/sessionList";
import { getSession, listSessions } from "#/features/auth/server/session";
import { m } from "#/paraglide/messages";

export const Route = createFileRoute("/app/account")({
	component: RouteComponent,
	loader: async () => {
		const currentSession = await getSession();

		if (!currentSession) {
			throw redirect({ to: "/app/auth" });
		}

		const sessions = await listSessions();

		return { sessions, currentSession };
	},
});

function RouteComponent() {
	const { sessions, currentSession } = Route.useLoaderData();

	return (
		<main className="py-6 px-4 flex flex-col gap-6">
			<header className="flex flex-col items-center max-w-xl mx-auto">
				<h1 className="text-center text-2xl font-semibold">
					{m["account.title"]()}
				</h1>
				<Separator className="text-center w-32" />
			</header>

			<Card>
				<CardHeader>
					<CardTitle>{m["account.sessions"]()}</CardTitle>
				</CardHeader>
				<CardContent>
					<SessionList
						sessions={sessions}
						currentSession={currentSession.session}
					/>
				</CardContent>
			</Card>
		</main>
	);
}
