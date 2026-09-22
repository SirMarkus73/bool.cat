import { CreateShortUrlDialog } from "#/features/dashboard/components/createShortUrlDialog";
import { m } from "#/paraglide/messages";

type Props = {
	onCreated?: (slug: string) => void;
};

export function DashboardHeader({ onCreated }: Props) {
	return (
		<div className="flex flex-wrap items-center justify-between gap-4">
			<h1 className="text-2xl font-bold">{m["dashboard.title"]()}</h1>
			<CreateShortUrlDialog onSuccess={onCreated} />
		</div>
	);
}
