import { queryOptions } from "@tanstack/react-query";
import { listUrls } from "#/lib/server/url/list";

export const createListUrlsQuery = ({ q }: { q?: string }) =>
	queryOptions({
		queryKey: q ? ["urls", { data: { q } }] : ["urls"],
		queryFn: async () => {
			const urls = listUrls({ data: { q } }) || [];
			return urls;
		},
	});

export const listUrlsQuery = createListUrlsQuery({});
