import { useMutation } from "@tanstack/react-query";
import { useRouter } from "@tanstack/react-router";
import type { Session } from "better-auth";
import Bowser from "bowser";
import { Monitor, ShieldQuestion, Smartphone } from "lucide-react";
import { Badge } from "#/components/ui/badge";
import { Button } from "#/components/ui/button";
import {
	Item,
	ItemActions,
	ItemContent,
	ItemDescription,
	ItemMedia,
	ItemTitle,
} from "#/components/ui/item";
import { Spinner } from "#/components/ui/spinner";
import { authClient } from "#/features/auth/lib/auth-client";
import { m } from "#/paraglide/messages";

type SessionItemProps = {
	session: Session;
	currentSession: Session;
};

export function SessionItem({ session, currentSession }: SessionItemProps) {
	const router = useRouter();

	const { mutate: revokeSession, isPending } = useMutation({
		mutationFn: async (token: string) => {
			await authClient.revokeSession({ token });
		},
		onSettled: () => {
			router.invalidate();
		},
	});

	const browser = session.userAgent
		? Bowser.getParser(session.userAgent)
		: null;

	const createRevokeSessionFn = (token: string) => async () => {
		revokeSession(token);
	};

	return (
		<li>
			<Item>
				<ItemMedia>
					{!browser ? (
						<ShieldQuestion className="size-10" />
					) : browser.getPlatformType() === "desktop" ? (
						<Monitor className="size-10" />
					) : (
						<Smartphone className="size-10" />
					)}
				</ItemMedia>

				<ItemContent>
					<ItemTitle>
						{browser
							? `${browser.getBrowserName()} - ${browser.getOSName()}`
							: m["account.unknown_device"]()}
					</ItemTitle>
					<ItemDescription>
						{session.id === currentSession.id && (
							<Badge variant="secondary">
								{m["account.current_session"]()}
							</Badge>
						)}
					</ItemDescription>
				</ItemContent>
				<ItemActions>
					<Button
						variant="destructive"
						disabled={isPending}
						onClick={createRevokeSessionFn(session.token)}
						title={
							session.id === currentSession.id
								? m["account.logout"]()
								: m["account.revoke_session"]()
						}
					>
						{isPending && <Spinner data-icon="inline-start" />}
						{session.id === currentSession.id
							? m["account.logout"]()
							: m["account.revoke_session"]()}
					</Button>
				</ItemActions>
			</Item>
		</li>
	);
}
