import config from '../../config'
import EncryptionUtil from './encryption.util'

const { AES, RSA } = EncryptionUtil

describe('Encryption utility', () => {
  describe('AES Encryption', () => {
    it('should be able to generate an AES key (secret)', async () => {
      const key = await AES.generateKey()

      expect(key).toBeTruthy()
    })

    it('should be able to encrypt a message using a generated key', async () => {
      const key = await AES.generateKey()
      const encrypted = await AES.encrypt(key, JSON.stringify({ id: 'testing-123' }))
      
      expect(key).toBeTruthy()
      expect(encrypted).toBeTruthy()
    })

    it('should be able to encrypt and then decrypt a message using a generated key', async () => {
      const key = await AES.generateKey()
      const encrypted = await AES.encrypt(key, JSON.stringify({ id: 'testing-123' }))
      const decrypted = await AES.decrypt(key, encrypted)
      
      expect(key).toBeTruthy()
      expect(encrypted).toBeTruthy()
      expect(decrypted).toBe(JSON.stringify({ id: 'testing-123' }))
    })
  })

  describe('RSA Encryption', () => {
    it('should be able to generate an RSA keys (public & private)', async () => {
      const keys = await RSA.generateKeys()

      expect(keys).toHaveProperty('public')
      expect(keys).toHaveProperty('private')
    })

    it('should be able to encrypt a message using a generated public key', async () => {
      const keys = await RSA.generateKeys()
      const encrypted = await RSA.encrypt(keys.public, JSON.stringify({ id: 'testing-rsa' }))
      
      expect(encrypted).toBeTruthy()
    })

    it('should be able to encrypt and then decrypt with private key', async () => {
      const keys = await RSA.generateKeys()
      const encrypted = await RSA.encrypt(keys.public, JSON.stringify({ id: 'testing-rsa' }))
      const decrypted = await RSA.decrypt(keys.private, encrypted)
      const decryptedJSON = JSON.parse(decrypted)
      
      expect(decrypted).toBe(JSON.stringify({ id: 'testing-rsa' }))
      // check that it can be parsed correctly
      expect(decryptedJSON).toHaveProperty('id')
      expect(decryptedJSON.id).toBe('testing-rsa')
    })
  })
})