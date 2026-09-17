import {
	Body,
	Column,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Link,
	Row,
	Section,
	Tailwind,
	Text,
} from "react-email";
import { m } from "#/paraglide/messages";

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
				<Head />
				<Body className="bg-neutral-900 text-white">
					<Heading className="text-center text-5xl text-blue-600">
						Bool.cat
					</Heading>
					<Container>
						<Section>
							<Row>
								<Column>
									<Heading className="text-3xl">
										{m["email_verification.email.greeting"]({ username })}
									</Heading>
								</Column>
							</Row>
							<Row>
								<Column>
									<Text className="text-lg">
										{m["email_verification.email.body"]()}
									</Text>
								</Column>
							</Row>
							<Row>
								<Column>
									<Link
										href={url}
										className="bg-blue-600 rounded-lg px-3 py-2 text-white border border-blue-800 hover:bg-blue-700 hover:border-blue-700 cursor-pointer transition-colors"
									>
										{m["email_verification.email.button_text"]()}
									</Link>
								</Column>
							</Row>
						</Section>
					</Container>

					<Hr className="max-w-150 my-5" />
					<Section>
						<Text className="text-sm text-neutral-400 text-center mt-auto">
							{m["email_verification.email.footer"]()}
						</Text>
					</Section>
				</Body>
			</Tailwind>
		</Html>
	);
}
