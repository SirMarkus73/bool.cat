import { createFileRoute, redirect } from "@tanstack/react-router";
import { getSession } from "#/lib/server/auth/getSession";

export const Route = createFileRoute("/app/")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getSession();

		if (!session) {
			throw redirect({ to: "/app/auth" });
		}

		return { user: session.user };
	},
});

function RouteComponent() {
	return <div>Panel de control</div>;
}
