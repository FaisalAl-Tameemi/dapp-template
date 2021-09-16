/**
 * NOTE: this test assumes that it's running against a testing DB
 * See the `env.yaml` file to view the testing configs
 */

import { User } from '../../'

describe('User DB Model tests...', () => {

    describe('User has the correct fields', () => {
        const makeCreateCall = (data = {}) => {
            return new Promise((resolve, reject) => {
                User
                    .create({
                        ...data,
                        createdAt: new Date(),
                        updatedAt: new Date(),
                    })
                    .then(resolve)
                    .catch(reject)
            })
        }

        it('should have a required `name` field', async () => {
            await expect(makeCreateCall({
                email: 'tester+something@example.com',
                password: 'something else',
            })).rejects.toThrowError()

            await expect(makeCreateCall({
                name: 'tester',
                email: 'tester+something+else@example.com',
                password: 'something else',
            })).resolves.toBeTruthy()
        })

        it('should have an `email` and `password` fields which is required', async () => {
            await expect(makeCreateCall({
                name: 'tester',
                email: 'tester+something@example.com',
            })).rejects.toThrowError()

            await expect(makeCreateCall({
                name: 'tester',
                password: 'something else',
            })).rejects.toThrowError()

            await expect(makeCreateCall({
                name: 'tester',
                email: 'tester+something+else@example.com',
                password: 'something else',
            })).resolves.toBeTruthy()
        })

        // remove all users after each `it` above
        afterEach(async () => {
            await User.destroy({ truncate: true, cascade: true })
        })
    })

})
