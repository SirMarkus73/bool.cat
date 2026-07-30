import { createFileRoute, notFound, redirect } from "@tanstack/react-router";
import { getUrlBySlug } from "#/server/url/getUrlBySlug";

export const Route = createFileRoute("/$")({
	component: RouteComponent,
	beforeLoad: async ({ params }) => {
		if (!params._splat) {
			throw notFound();
		}

		const url = await getUrlBySlug({ data: { slug: params._splat } });

		if (!url) {
			throw notFound();
		}

		throw redirect({ href: url.redirectUrl });
	},
});

function RouteComponent() {
	// Componente para futuro, cuando las rutas sean protegidas por contraseña
	return <div>Hello "/$"!</div>;
}
