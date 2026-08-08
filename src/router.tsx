import { QueryClient } from "@tanstack/react-query";
import { createRouter as createTanStackRouter } from "@tanstack/react-router";
import { setupRouterSsrQueryIntegration } from "@tanstack/react-router-ssr-query";
import { deLocalizeUrl, localizeUrl } from "./paraglide/runtime";
import { routeTree } from "./routeTree.gen";

export function getContext() {
	const queryClient = new QueryClient();

	return {
		queryClient,
	};
}

export function getRouter() {
	const context = getContext();

	const router = createTanStackRouter({
		routeTree,
		rewrite: {
			input: ({ url }) => deLocalizeUrl(url),
			output: ({ url }) => localizeUrl(url),
		},
		scrollRestoration: true,
		defaultPreload: "intent",
		defaultPreloadStaleTime: 0,
		context,
	});

	setupRouterSsrQueryIntegration({
		router,
		queryClient: context.queryClient,
		// optional:
		// handleRedirects: true,
		// wrapQueryClient: true,
	});

	return router;
}

declare module "@tanstack/react-router" {
	interface Register {
		router: ReturnType<typeof getRouter>;
	}
}
