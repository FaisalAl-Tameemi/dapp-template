/**
 * A very simple sandbox file for interacting with the contracts quickly. Can be removed.
 */

 import { ethers } from 'ethers'
import { InuToken__factory as InuTokenFactory } from './typechain'

const inuTokenAddress = process.env.INU_TOKEN_ADDRESS || '0x4266e699F814a12ed4748735582EBFFffE571cbE'
const ownerPrivateKey = process.env.INU_TOKEN_OWNER_PRIV_KEY || '5af769cbc95afe98f6a0d08c641e419be331692e30f8a85e06f55adc6db2cd29'

const start = async () => {
    const provider = ethers.providers.getDefaultProvider('rinkeby')
    const owner = new ethers.Wallet(ownerPrivateKey, provider)
    const inuToken = InuTokenFactory.connect(inuTokenAddress, owner)

    console.log(owner._isSigner)
    console.log(`Balance Of ${owner.address}: `, await inuToken.balanceOf(owner.address))
}

start()