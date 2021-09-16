import * as jwt from 'jsonwebtoken'

import config from '../../config'
import { decodeJwtToken, TokenTypes, JWT_SECRETS } from './token.util'
import { setTimeoutPromise } from '../testing.util'


describe('JWT Token utility', () => {

    describe('Decoding tokens', () => {

        it('should be able to decode a token given the token string and a token type', async () => {
            const token: string = jwt.sign({ userId: 'test-id' }, JWT_SECRETS[TokenTypes.AUTH])
            const decoded: any = await decodeJwtToken(token, TokenTypes.AUTH)

            expect(decoded).toHaveProperty('userId')
            expect(decoded.userId).toEqual('test-id')
        })

        it('should throw an error if the token is expired', async () => {
            // create a token set to expire in 1 second
            const token: string = jwt.sign({ userId: 'test-id' }, JWT_SECRETS[TokenTypes.AUTH], { expiresIn: 1 })
            // wait for 3 seconds
            await setTimeoutPromise(3)
            
            expect(decodeJwtToken(token, TokenTypes.AUTH)).rejects.toThrowError()
        })

        it('should throw an error if the token is decoded with wrong secret', async () => {
            // create a token signed with AUTH jwt secret
            const token: string = jwt.sign({ userId: 'test-id' }, JWT_SECRETS[TokenTypes.AUTH])

            // decoding the token with a different secret should fail
            expect(decodeJwtToken(token, TokenTypes.PASSWORD_RESET)).rejects.toThrowError()
        })

    })

})