import nodemailer from "nodemailer";
import { render } from "react-email";
import { serverEnv } from "#/lib/env/server";

type SendEmailParams<C extends React.ElementType> = {
	to: string;
	subject: string;
	Component: C;
	params: React.ComponentProps<C>;
};

const transporter = nodemailer.createTransport({
	host: serverEnv.SMTP_HOST,
	port: serverEnv.SMTP_PORT,
	secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
	auth: {
		user: serverEnv.SMTP_USER,
		pass: serverEnv.SMTP_PASSWORD,
	},
});

export async function sendEmail<C extends React.ElementType>({
	Component,
	to,
	subject,
	params,
}: SendEmailParams<C>) {
	try {
		await transporter.sendMail({
			from: `"Marcos" <${serverEnv.SMTP_USER}>`,
			to,
			subject,
			html: await render(<Component {...params} />),
		});
	} catch (error) {
		console.error("Error sending email:", error);
		throw error;
	}
}
