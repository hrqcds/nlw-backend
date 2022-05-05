import { prisma } from "../../database/prisma";
import { FeedbackCreateData, FeedbacksRepository } from "../feedbacks-repository";

export class PrismaFeedbackRepository implements FeedbacksRepository {
    async create({ type, comment, screenshot }: FeedbackCreateData): Promise<void> {

        await prisma.feedback.create({
            data: {
                type, comment, screenshot
            }
        })

    };

}