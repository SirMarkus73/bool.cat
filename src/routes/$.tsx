import {
	createFileRoute,
	Link,
	notFound,
	redirect,
} from "@tanstack/react-router";
import { LinkIcon } from "lucide-react";
import { buttonVariants } from "#/components/ui/button";
import { getUrlBySlug } from "#/lib/server/url/getUrlBySlug";
import {
	Empty,
	EmptyContent,
	EmptyDescription,
	EmptyHeader,
	EmptyMedia,
	EmptyTitle,
} from "@/components/ui/empty";

export const Route = createFileRoute("/$")({
	component: RouteComponent,
	notFoundComponent: NotFoundComponent,
	beforeLoad: async ({ params }) => {
		if (!params._splat) {
			throw notFound();
		}

		const response = await getUrlBySlug({ data: { slug: params._splat } });

		if (response.success) {
			throw redirect({ href: response.data.redirectUrl });
		}

		throw notFound();
	},
});

function RouteComponent() {
	// Componente para futuro, cuando las rutas sean protegidas por contraseña
	return <div>Hello "/$"!</div>;
}

function NotFoundComponent() {
	return (
		<main className="grid lg:place-items-center mt-8 justify-items-center px-4 pb-6">
			<Empty className="border border-dashed border-border w-full max-w-sm md:max-w-xl lg:max-w-2/3 ">
				<EmptyHeader>
					<EmptyMedia variant="icon">
						<LinkIcon />
					</EmptyMedia>
					<EmptyTitle>Este enlace no está disponible</EmptyTitle>
					<EmptyDescription>
						Lo sentimos, el enlace al que intentas acceder no existe o ya ha
						expirado. Si te lo compartieron, pide que te envíen uno nuevo.
					</EmptyDescription>
				</EmptyHeader>
				<EmptyContent>
					<Link to="/" className={buttonVariants({ variant: "secondary" })}>
						Volver al inicio
					</Link>
				</EmptyContent>
			</Empty>
		</main>
	);
}
