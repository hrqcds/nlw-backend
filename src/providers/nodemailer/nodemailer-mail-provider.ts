import { MailProvider, SendEmailData } from "../mail-provider";
import nodemailer from "nodemailer";

const transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 2525,
    auth: {
        user: "a5a4e89c8dacbc",
        pass: "8a163819853ff3"
    }
});


export class NodemailerMailProvider implements MailProvider {

    async sendMail({ subject, body }: SendEmailData) {
        await transport.sendMail({
            from: "Equipe Feedget <oi@feedget.com>",
            to: "Henrique Santos <hrqcds.dev@gmail.com>",
            subject,
            html: body
        })
    };
}