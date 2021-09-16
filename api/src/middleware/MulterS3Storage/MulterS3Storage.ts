import * as uuidv4 from 'uuid/v4'
import { last } from 'lodash'
import s3Util from '../../util/s3'
import { StorageEngine } from 'multer'
import logger from '../../util/log.util'

/**
 * A custom storage handler for multer which allows uploads
 * directly into S3 from memory
 */
export class MulterS3Storage implements StorageEngine {
    getKey: Function

    constructor () {
        this.getKey = this._defaultGetKey
    }

    _defaultGetKey (file: Express.Multer.File|any) {
        logger.debug('@MulterS3Storage#_defaultGetKey', file)
        return `${uuidv4()}.${last(file.originalname.split('.'))}`
    }

    _handleFile (req: Express.Request, file: Express.Multer.File|any, _done: Function): void {
        s3Util
            .uploadFileStream(file.stream, this.getKey(file))
            .then((result: s3Util.S3UploadResponse) => _done(null, result))
            .catch((err) => _done(err))
    }

    _removeFile (req: Express.Request, file: Express.Multer.File|any, _done: Function): void {
        // @todo: implement a way to remove files from s3, should be in the util
        _done(null)
    }
}

export default MulterS3Storage