import config from '../../config'
import * as Twilio from 'twilio'

export const twilioClient = Twilio(config.TWILIO_ACCOUNT_SID, config.TWILIO_AUTH_TOKEN)

export type PhoneNumber = string;

export interface TwilioMessageParams {
    to: PhoneNumber;
    from?: PhoneNumber;
    body: string;
    messagingServiceSid?: string;
}

export interface TwilioMessageResponse {
    messageId: string;
}

/**
 * Send a message to a given phone number via Twilio client
 * @param params: the parameters used to send the message (from, to, body)
 */
export const sendMessage = async (params: TwilioMessageParams): Promise<TwilioMessageResponse> => {
    return twilioClient.messages
        .create({
            from: config.TWILIO_DEFAULT_SENDER,
            ...params
        })
        .then((response) => ({
            messageId: response.sid
        }))
}

/**
 * Generates a string composed of N numeric digits.
 * 
 * @param numOfDigits: Number of desired digits in code
 */
export const generateNumberVerificationCode = (numOfDigits: number = 5): string => {
    return Array
    // generates an array of N undefined values so it can be iterated over
    .apply(null, Array(5))
    // generates a random value for each array position
    .map(() => Math.floor(Math.random() * 10))
    .join('')
}

/**
 * Checks if a string contains a valid phone number using regex.
 * Ex: '+14162223434' is valid
 * 
 * @param numberToCheck: phone number string
 */
export const isNumberValid = (numberToCheck: PhoneNumber): boolean => {
    const regexGroups = 
        numberToCheck.match(/^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/g)

    return regexGroups.length > 0 && numberToCheck.replace('+', '').length >= 10
}