import { Router } from "express";
import { SubmitFeedbackContext } from "../contexts/submit-feedback-context";
import { PrismaFeedbackRepository } from "../repository/prisma/prisma-feedback-repository";
import { NodemailerMailProvider } from "../providers/nodemailer/nodemailer-mail-provider";

const router = Router()

router.post("/feedbacks", async (req, res) => {

    const { type, comment, screenshot } = req.body

    const prismaFeedbackRepository = new PrismaFeedbackRepository()
    const nodemailerMailProvider = new NodemailerMailProvider()
    const SubmitFeedBack = new SubmitFeedbackContext(prismaFeedbackRepository, nodemailerMailProvider)

    await SubmitFeedBack.execute({ type, comment, screenshot })



    return res.status(201).send()
})

export { router }