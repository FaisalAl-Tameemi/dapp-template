import Axios from 'axios'
import { Readable as ReadableStream } from 'stream'
import { uploadFileStream, getSignedURL, s3, S3UploadResponse } from './s3.util'


describe('S3 utility', () => {
    // create some jest mock methods
    const uploadPromiseMock = jest.fn((): Promise<S3UploadResponse> => 
        new Promise((resolve) => resolve({
            Key: '1234',
            Bucket: 'blabla',
            Location: 'https://',
            ETag: 'something-something'
        })))

    const signObjectMock = jest.fn((): Promise<any> => 
        new Promise((resolve) => resolve({})))

    beforeAll(async () => {
        s3.upload = () => ({
            promise: uploadPromiseMock,
            abort: () => {},
            send: () => {},
            on: () => {}
        })

        s3.getSignedUrlPromise = signObjectMock
    })

    describe('Upload file via AWS sdk', () => {
        it('should be able to pipe a readable stream into a passthrough and return a promise', async () => {
            const { data: imageFileStream } = await Axios({
                method: 'get',
                url: 'https://free-images.com/sm/c1df/lilac_blossom_bloom_spring.jpg',
                responseType: 'stream',
            })

            expect(uploadFileStream(imageFileStream, '1234')).resolves.toHaveProperty('Location')
            expect(uploadPromiseMock).toHaveBeenCalledTimes(1)
        })
    })

    describe('Get signed URL via AWS sdk', () => {
        it('should be able to signed the object and return a public URL', async () => {
            expect(getSignedURL('1234')).resolves.toBeTruthy()
        })
    })

})