import { createFileRoute, redirect } from "@tanstack/react-router";
import { useState } from "react";
import { Button } from "#/components/ui/button";
import { Card } from "#/components/ui/card";
import { LoginCard } from "#/features/auth/components/form/login/loginCard";
import { RegisterCard } from "#/features/auth/components/form/register/registerCard";
import { getSession } from "#/features/auth/server/session";
import { m } from "#/paraglide/messages";

export const Route = createFileRoute("/app/auth")({
	component: RouteComponent,
	beforeLoad: async () => {
		const session = await getSession();

		if (session) {
			throw redirect({ to: "/app" });
		}
	},
});

function RouteComponent() {
	const [mode, setMode] = useState<"login" | "register">("login");

	return (
		<main className="my-12 mx-6">
			<Card className="border-b-0 rounded-b-none flex flex-row *:flex-1 px-2 gap-0">
				<Button
					variant={mode === "register" ? "secondary" : "default"}
					type="button"
					onClick={() => setMode("login")}
					className="border-e-0 rounded-e-none"
				>
					{m["forms.auth.login"]()}
				</Button>
				<Button
					variant={mode === "login" ? "secondary" : "default"}
					type="button"
					onClick={() => setMode("register")}
					className="border-s-0 rounded-s-none"
				>
					{m["forms.auth.register"]()}
				</Button>
			</Card>
			{mode === "login" ? (
				<LoginCard className="rounded-t-none" />
			) : (
				<RegisterCard className="rounded-t-none" />
			)}
		</main>
	);
}
