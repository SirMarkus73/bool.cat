import { useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "@tanstack/react-router";
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "#/components/ui/card";
import { useAppForm } from "#/hooks/useAppForm";
import { listUrlsQuery } from "#/lib/query/url/list";
import { createShortUrl } from "#/lib/server/url/createShortUrl";
import { m } from "#/paraglide/messages";
import { CreateShortUrlForm } from "./createShortUrlForm";
import { CreateShortUrlFormActions } from "./createShortUrlFormActions";
import { createShortUrlFormOptions } from "./createShortUrlFormOptions";

type Props = {
	className?: string;
};

export function CreateShortUrlCard({ className }: Props) {
	const queryClient = useQueryClient();
	const navigate = useNavigate();

	const form = useAppForm({
		...createShortUrlFormOptions,
		onSubmit: async ({ value, formApi }) => {
			const { targetUrl } = value;

			const { slug } = await createShortUrl({
				data: {
					longUrl: targetUrl,
					mode: "user",
					expirationDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
				},
			});
			formApi.reset();

			await queryClient.invalidateQueries({
				queryKey: listUrlsQuery.queryKey,
			});
			navigate({ hash: slug, hashScrollIntoView: { behavior: "smooth" } });
		},
	});

	return (
		<Card className={className}>
			<CardHeader>
				<CardTitle>{m["forms.short_url.create_short"]()}</CardTitle>
				<CardDescription>
					{m["forms.short_url.create_short_description"]()}
				</CardDescription>
			</CardHeader>
			<CardContent>
				<CreateShortUrlForm form={form} />
			</CardContent>
			<CardFooter>
				<CreateShortUrlFormActions form={form} />
			</CardFooter>
		</Card>
	);
}
