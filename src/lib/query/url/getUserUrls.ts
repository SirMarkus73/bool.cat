import { queryOptions } from "@tanstack/react-query";
import { getUserUrls } from "#/lib/server/url/getUserUrls";

export const createUrlsQuery = ({ q }: { q?: string }) =>
	queryOptions({
		queryKey: ["urls", { data: { q } }],
		queryFn: async () => {
			const urls = getUserUrls({ data: { q } }) || [];
			return urls;
		},
	});

export const urlsQuery = createUrlsQuery({});
