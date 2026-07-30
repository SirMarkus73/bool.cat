import { createFileRoute } from "@tanstack/react-router";
import { MoveDown } from "lucide-react";
import catImage from "#/assets/code_cat.png";
import { Button } from "#/components/ui/button";
import { Card, CardContent } from "#/components/ui/card";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
	return (
		<main className="flex flex-col md:flex-row justify-between items-center *:flex-1 py-32 px-6 gap-4 bg-linear-to-br from-card via-primary/20 to-primary/80">
			<div className="flex flex-col gap-4 justify-center">
				<h1 className="text-6xl font-bold text-balance">
					Enlaces cortos.
					<br />
					Simplicidad verdadera.
				</h1>
				<p className="mt-4 text-lg text-gray-500 text-pretty">
					<b>bool.cat</b> es un acortador de enlaces que te permite crear URLs
					cortas y fáciles de recordar. Con nuestra plataforma, puedes compartir
					tus enlaces de manera rápida y sencilla, sin complicaciones ni
					distracciones.
				</p>
				<Button type="button">Crear enlace corto</Button>
			</div>
			<Card className="relative overflow-visible">
				<img
					src={catImage}
					alt="code cat"
					className="absolute -top-2 size-96 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
				/>
				<CardContent className="flex flex-col gap-4 p-4 text-start z-20 bg-card">
					<code className="outline outline-primary rounded p-2">
						www.dummy.cat/tu/enlace/largo
					</code>

					<MoveDown />
					<code className="outline outline-primary rounded p-2">
						bool.cat/AFRGYT
					</code>
				</CardContent>
			</Card>
		</main>
	);
}
