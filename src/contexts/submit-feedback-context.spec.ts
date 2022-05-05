import { SubmitFeedbackContext } from "./submit-feedback-context"

const createFeedbackSpy = jest.fn()
const sendEmailSpy = jest.fn()

const submitFeeback = new SubmitFeedbackContext(
    { create: createFeedbackSpy },
    { sendMail: sendEmailSpy }
)

describe("Submit Feedback", () => {


    it("Should be able to submit a feedback", async () => {

        await expect(submitFeeback.execute({ type: "bug", comment: "tudo bugado", screenshot: "data:image/png;base64test.jpg" }))
            .resolves
            .not
            .toThrow()
        expect(createFeedbackSpy).toHaveBeenCalled()
        expect(sendEmailSpy).toHaveBeenCalled()
    })

    it("Should not be able to submit a feedback without type", async () => {

        await expect(submitFeeback.execute({ type: "", comment: "tudo bugado", screenshot: "data:image/png;base64test.jpg" }))
            .rejects
            .toThrow()
    })

    it("Should not be able to submit a feedback without comment", async () => {

        await expect(submitFeeback.execute({ type: "bug", comment: "", screenshot: "data:image/png;base64test.jpg" }))
            .rejects
            .toThrow()
    })

    it("Should not be able to submit a feedback with invalid screenshot", async () => {

        await expect(submitFeeback.execute({ type: "bug", comment: "tudo bugado", screenshot: "64test.jpg" }))
            .rejects
            .toThrow()
    })
})