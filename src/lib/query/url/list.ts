import { queryOptions } from "@tanstack/react-query";
import { listUrls } from "#/lib/server/url/list";

export const createListUrlsQuery = ({ q }: { q?: string }) =>
	queryOptions({
		queryKey: ["urls", { data: { q } }],
		queryFn: async () => {
			const urls = listUrls({ data: { q } }) || [];
			return urls;
		},
	});

export const listUrlsQuery = createListUrlsQuery({});
