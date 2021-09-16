import * as randomstring from 'randomstring'
import * as crypto from 'crypto'
import * as aes from 'aes-js'
import * as rsa from 'node-rsa'

export const SECURITY_LEVEL = 2048;

export enum EncryptionType {
  RSA = 'rsa',
  AES = 'aes'
}

namespace EncryptionUtil {
  export class AES {
    static encrypt = async (secret: string, text: string): Promise<Uint8Array> => {
      // hash secret to 256 bit (32 byte) key
      const secretHash = crypto.createHash('md5').update(secret).digest("hex")
      const key = aes.utils.hex.toBytes(secretHash)
      const textBytes = aes.utils.utf8.toBytes(text)
      const aesCtr = new aes.ModeOfOperation.ctr(key)
      const encryptedBytes = aesCtr.encrypt(textBytes)
      return encryptedBytes
    }

    static decrypt = async (secret: string, encryptedBytes: any): Promise<any> => {
      // hash secret to 256 bit (32 byte) key
      const secretHash = crypto.createHash('md5').update(secret).digest("hex")
      const key = aes.utils.hex.toBytes(secretHash)
      const aesCtr = new aes.ModeOfOperation.ctr(key)
      const decryptedBytes = aesCtr.decrypt(encryptedBytes)
      return aes.utils.utf8.fromBytes(decryptedBytes)
    }

    static generateKey = async (): Promise<string> => {
      return crypto.createHash('md5').update(randomstring.generate()).digest("hex")
    }
  }

  interface RSAKeyPair {
    public: string;
    private: string;
  }

  export class RSA {
    static encrypt = async (publicKey: string, message: string): Promise<string> => {
      const buffer = new Buffer(message)
      // padding type must be compatible with client-side packages
      const encrypted: Buffer = crypto.publicEncrypt({
        key: publicKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      }, buffer)

      return encrypted.toString('base64')
    }

    static decrypt = async (privateKey: string, message: string): Promise<any> => {
      var buffer = new Buffer(message, 'base64');
      // padding type must be compatible with client-side packages
      const decrypted = crypto.privateDecrypt({
        key: privateKey,
        padding: crypto.constants.RSA_PKCS1_PADDING
      }, buffer)

      return decrypted.toString('utf8')
    }

    static generateKeys = async (): Promise<RSAKeyPair> => {
      const key = new rsa({ b: SECURITY_LEVEL })

      // formatting must be compatible with client-side packages
      return {
        'private': key.exportKey('pkcs1-private-pem'),
        'public': key.exportKey('pkcs8-public-pem')
      }
    }
  }
}

export default EncryptionUtil