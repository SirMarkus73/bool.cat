import { TanStackDevtools } from "@tanstack/react-devtools";
import {
	createRootRouteWithContext,
	HeadContent,
	Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TooltipProvider } from "#/components/ui/tooltip";
import { Footer } from "#/features/layout/components/footer";
import { Header } from "#/features/layout/components/header";
import { getLocale } from "#/paraglide/runtime";
import type { getContext } from "#/router";
import appCss from "../styles.css?url";

export const Route = createRootRouteWithContext<
	ReturnType<typeof getContext>
>()({
	head: () => ({
		meta: [
			{
				charSet: "utf-8",
			},
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1",
			},
			{
				title: "bool.cat - A simple URL shortener",
			},
			{
				name: "og:title",
				content: "bool.cat - A simple URL shortener",
			},
			{
				name: "twitter:title",
				content: "bool.cat - A simple URL shortener",
			},
			{
				name: "twitter:description",
				content:
					"bool.cat is a simple URL shortener that helps you create shorter links for your web content.",
			},
			{
				name: "description",
				content:
					"bool.cat is a simple URL shortener that helps you create shorter links for your web content.",
			},
			{
				name: "og:description",
				content:
					"bool.cat is a simple URL shortener that helps you create shorter links for your web content.",
			},
			{
				name: "og:url",
				content: "https://bool.cat",
			},
			{
				name: "twitter:url",
				content: "https://bool.cat",
			},
			{
				name: "og:image",
				content: "https://bool.cat/landing-preview.png",
			},
			{
				name: "twitter:image",
				content: "https://bool.cat/landing-preview.png",
			},
		],

		links: [
			{
				rel: "stylesheet",
				href: appCss,
			},
			{
				rel: "icon",
				href: "/favicon.svg",
			},
		],
	}),
	shellComponent: RootDocument,
});

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<html lang={getLocale()} className="dark">
			<head>
				<HeadContent />
			</head>
			<body>
				<TooltipProvider>
					<div className="grid grid-rows-[auto_1fr_auto] min-h-dvh">
						<Header />

						{children}
						<Footer />
					</div>
				</TooltipProvider>
				<TanStackDevtools
					config={{
						position: "bottom-right",
					}}
					plugins={[
						{
							name: "Tanstack Router",
							render: <TanStackRouterDevtoolsPanel />,
						},
					]}
				/>
				<Scripts />
			</body>
		</html>
	);
}
