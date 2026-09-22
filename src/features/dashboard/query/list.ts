import { queryOptions } from "@tanstack/react-query";
import { listUrls } from "#/features/dashboard/server/list";

export const createListUrlsQuery = ({ q }: { q?: string }) =>
	queryOptions({
		queryKey: q ? ["urls", { data: { q } }] : ["urls"],
		queryFn: async () => {
			const result = (await listUrls({ data: { q } })) || [];

			if (!result.success) {
				throw new Error(result.message);
			}

			return result.data;
		},
	});

export const listUrlsQuery = createListUrlsQuery({});
