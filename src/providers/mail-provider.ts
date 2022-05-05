export interface SendEmailData {
    subject: string,
    body: string
}

export interface MailProvider {
    sendMail: (data: SendEmailData) => Promise<void>
}