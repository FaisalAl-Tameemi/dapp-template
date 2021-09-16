/**
 * NOTE: this test assumes that it's running against a testing DB
 * See the `env.yaml` file to view the testing configs
 */

import { User } from '../../'
import { Thing, thingTypeEnums } from './Thing.model'

describe('Thing DB Model tests...', () => {
    let sharedData: any = {}

    beforeAll(async () => {
        await new Promise((resolve) => setTimeout(resolve, 1000))

        return User
            .create({
                name: 'testing things',
                email: 'testing+things+create@test.com',
                password: 'test1234'
            })
            .then((u1) => {
                sharedData.user = u1
                return null
            })
    })

    describe('Thing has the correct fields', () => {
        it('should have a `title` and `kind` field which is required', async () => {
            const makeCreateCall = (data = {}) => {
                return new Promise((resolve, reject) => {
                    Thing
                        .create({
                            ...data,
                            ownerId: sharedData.user.id,
                            createdAt: new Date(),
                            updatedAt: new Date(),
                        })
                        .then(resolve)
                        .catch(reject)
                })
            }

            await expect(makeCreateCall()).rejects.toThrowError()
            await expect(makeCreateCall({
                title: 'test',
            })).rejects.toThrowError()
            await expect(makeCreateCall({
                kind: thingTypeEnums.GENERAL,
            })).rejects.toThrowError()

            await expect(makeCreateCall({
                title: 'test',
                kind: thingTypeEnums.GENERAL,
            })).resolves.toBeTruthy()
        })
    })

    afterAll(async () => {
        await Thing.destroy({ truncate: true, cascade: true })
        await User.destroy({ truncate: true, cascade: true })
    })

})
