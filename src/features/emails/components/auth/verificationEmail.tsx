import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Preview,
	Tailwind,
	Text,
} from "react-email";

type VerificationEmailProps = {
	username: string;
	url: string;
};

export default function VerificationEmail({
	url,
	username,
}: VerificationEmailProps) {
	return (
		<Html>
			<Tailwind config={{}}>
				<Head>
					<Preview>Verifica tu correo electrónico</Preview>
				</Head>
				<Body className="bg-neutral-900 text-white">
					<Heading className="text-center text-5xl text-blue-600">
						Bool.cat
					</Heading>
					<Hr className="max-w-xl" />

					<Container>
						<Heading className="text-3xl">Bienvenido, {username}</Heading>
						<Text className="text-lg">
							<Link href={url}>
								Haz clic aquí para verificar tu correo electrónico
							</Link>
						</Text>
					</Container>
				</Body>
			</Tailwind>
		</Html>
	);
}
