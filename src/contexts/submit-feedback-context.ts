import { MailProvider } from "../providers/mail-provider";
import { FeedbacksRepository } from "../repository/feedbacks-repository";

interface SubmitFeedbackContextRequest {
    type: string;
    comment: string;
    screenshot?: string;
}

export class SubmitFeedbackContext {

    constructor(
        private repository: FeedbacksRepository,
        private mailProvider: MailProvider
    ) { }

    async execute(request: SubmitFeedbackContextRequest): Promise<void> {

        const { type, comment, screenshot } = request
        const subject = "New Feedback"
        const body = [
            `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
            `<p>Tipo do feedback: ${type}</p>`,
            `<p>Comentário: ${comment}</p>`,
            `</div>`
        ].join("\n")

        if (!type) {
            throw new Error("Type is required")
        }

        if (!comment) {
            throw new Error("Comment is required")
        }

        if (screenshot && !screenshot.startsWith("data:image/png;base64")) {
            throw new Error("Invalid screenshot format")
        }

        await this.repository.create({ type, comment, screenshot })

        await this.mailProvider.sendMail({ subject, body })

        return
    }
}