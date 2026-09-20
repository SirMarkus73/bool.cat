import type { Session } from "better-auth";
import { SessionItem } from "./sessionItem";

type SessionListProps = {
	sessions: Session[];
	currentSession: Session;
};

export function SessionList({ sessions, currentSession }: SessionListProps) {
	return (
		<ul className="flex flex-col gap-2">
			<SessionItem session={currentSession} currentSession={currentSession} />
			{sessions.map((session) =>
				session.id !== currentSession?.id ? (
					<SessionItem
						key={session.id}
						session={session}
						currentSession={currentSession}
					/>
				) : null,
			)}
		</ul>
	);
}
