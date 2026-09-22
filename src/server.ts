import handler from "@tanstack/react-start/server-entry";
import { paraglideMiddleware } from "./paraglide/server.js";
export default {
	fetch(req: Request): Promise<Response> {
		return paraglideMiddleware(req, ({ request }) => {
			const pathname = new URL(request.url).pathname;
			const isApiRequest = pathname === "/api" || pathname.startsWith("/api/");

			return handler.fetch(isApiRequest ? request : req);
		});
	},
};
