import * as AWS from 'aws-sdk'
import { Stream, PassThrough } from 'stream'
import config from '../../config'
import logger from '../log.util'

// setup AWS keys
AWS.config.update({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_KEY,
    region: 'us-east-2',
})

// exported for mocking during tests
export const s3 = new AWS.S3({})

// alias
export type S3Upload = AWS.S3.ManagedUpload
export type S3UploadResponse = AWS.S3.ManagedUpload.SendData

/**
 * Given a readable stream of a file, passthrough that stream
 * into an s3 upload operation (i.e. upload the file without saving to disk)
 * @param inputStream - the stream of the file being uploaded
 * @param fileKey - the key under which the file is stored in S3
 *                  (recommended) use UUID of the file record in the DB
 */
export const uploadFileStream = async (inputStream: Stream, fileKey: string): Promise<S3UploadResponse> => {
    // a special stream that the `inputStream` will pipe to
    const passthroughStream = new PassThrough()

    logger.debug('upload', {
        Bucket: config.S3_BUCKET,
        Key: fileKey,
        AWS_ACCESS_KEY_ID: AWS.config.accessKeyId,
        Region: AWS.config.region
    })

    // this part handles the upload to s3 via the passthrough stream
    // it will also return a promise such that we can wait for the 
    // stream to finish uploading
    const uploadPromise = s3.upload({
        Bucket: config.S3_BUCKET,
        Key: fileKey,
        Body: passthroughStream
    }).promise()

    // use the passthrough stream
    inputStream.pipe(passthroughStream)

    return uploadPromise
}

/**
 * Given an identification for a file saved in the database (and s3),
 * this method returns a (signed) downloadable URL for that file.
 * @param fileId: an identifier for the file in S3 
 *                (i.e. file key used during upload)
 * @param expiryOverride: a number in seconds after which the url expires
 */
export const getSignedURL = async (fileId: string, expiryOverride?: number|undefined): Promise<string> => {
    return s3.getSignedUrlPromise('getObject', {
        Key: fileId,
        Bucket: config.S3_BUCKET,
        Expires: expiryOverride || config.S3_SIGNED_URL_EXPIRY_SECONDS
    })
}
