import config from '../../config'
import { sendEmail, nodemailerSendgrid, EmailTemplateTypes, EmailTemplateRenderTypes } from './email.util'


describe('Email utility', () => {
    // create some jest mock methods
    const sendEmailMock = jest.fn((): Promise<any> => 
        new Promise((resolve) => resolve({ emailId: '12345' })))

    beforeAll(async () => {
        nodemailerSendgrid.sendMail = sendEmailMock
    })

    describe('Send email functionality', () => {

        it('should be able to send email by calling via nodemailer', async () => {
            await sendEmail({
                to: 'test@test.com',
                subject: 'testing 123',
                template: EmailTemplateTypes.FORGOT_PASSWORD,
                templateType: EmailTemplateRenderTypes.HTML,
            })

            expect(sendEmailMock).toHaveBeenCalled()
        })

    })

})