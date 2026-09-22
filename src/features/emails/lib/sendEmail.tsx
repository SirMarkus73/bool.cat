import nodemailer from "nodemailer";
import { render } from "react-email";

type SendEmailParams<C extends React.ElementType> = {
	to: string;
	subject: string;
	Component: C;
	params: React.ComponentProps<C>;
};

const transporter = nodemailer.createTransport({
	host: process.env.SMTP_HOST,
	port: process.env.SMTP_PORT,
	secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
	auth: {
		user: process.env.SMTP_USER,
		pass: process.env.SMTP_PASSWORD,
	},
});

export async function sendEmail<C extends React.ElementType>({
	Component,
	to,
	subject,
	params,
}: SendEmailParams<C>) {
	await transporter.sendMail({
		from: process.env.SMTP_USER,
		to,
		subject,
		html: await render(<Component {...params} />),
	});
}
