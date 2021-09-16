import config from '../../config'
import { twilioClient, sendMessage, generateNumberVerificationCode, isNumberValid } from './twilio.util'


describe('Twilio utility', () => {
    // create some jest mock methods
    const messageCreateMock = jest.fn((): Promise<any> => 
        new Promise((resolve) => resolve({ messageId: '12345' })))

    beforeAll(async () => {
        // Mock some twilio client methods
        twilioClient.messages.create = messageCreateMock
    })

    describe('Twilio utility basic functionality', () => {

        it('should be able to generate an N digit random numeric code', () => {
            const nDigits = 5
            const generatedCode = generateNumberVerificationCode(nDigits)
            
            expect(generatedCode).toBeTruthy()
            expect(generatedCode.length).toBe(nDigits)
            expect(generatedCode.match(/[0-9]+/).length).toBe(1)
            expect(generatedCode.match(/[0-9]+/)[0]).toBe(generatedCode)
        })
        
        it('should be able to send a message by calling .sendMessage', async () => {
            const msgOpts = {
                to: '+16479978509',
                body: 'test 123'
            }
            
            await sendMessage(msgOpts)

            expect(messageCreateMock).toHaveBeenCalledWith({
                ...msgOpts,
                from: config.TWILIO_DEFAULT_SENDER,
            })
        })

        it('should be able to valid a phone number by calling .isNumberValid', () => {
            expect(isNumberValid('+16478888888')).toBe(true)
            expect(isNumberValid('478888888')).toBe(false)
            expect(isNumberValid('6478888888')).toBe(true)
            expect(isNumberValid('+647888888')).toBe(false)
        })

    })

})