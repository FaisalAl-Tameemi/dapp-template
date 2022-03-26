import { ethers } from 'hardhat'
import chaiAsPromised from 'chai-as-promised'
import chai from "chai"
import { solidity } from "ethereum-waffle"
import { Property } from "../typechain/Property"

chai.use(solidity)
chai.use(chaiAsPromised)

const { expect } = chai

describe('Property', () => {
	let property: Property

	beforeEach(async () => {
		// Launch a new contract before each test
		const signers = await ethers.getSigners()
		const propertyFactory = await ethers.getContractFactory(
			'Property',
			signers[0]
		)
		property = (await propertyFactory.deploy("", 10 ** 5, 10000)) as Property
		await property.deployed()
	})

	describe('Basic Functionality', async () => {

		it('should start balance at 0', async () => {
			const signers = await ethers.getSigners()
			const balanceResponse = await property.balanceOf(signers[1].address, 0)
			expect(balanceResponse).to.eq(0)
		})

		it('should allow minting', async () => {
			const signers = await ethers.getSigners()
			const pricePerToken = await property.pricePerShare()
			// mint tokens
			const mintResponse = await property.mint(100, {
				value: (pricePerToken.toNumber() * 100).toFixed(0).toString(),
			})
			await mintResponse.wait()
			// check balance
			const balanceResponse = await property.balanceOf(signers[0].address, 0)
			expect(balanceResponse).to.eq(100)
		})

		it('should deny a wallet to mint if msg.value is not sufficient', async () => {
			const pricePerToken = await property.pricePerShare()
			const value = (pricePerToken.toNumber() * 50).toFixed(0).toString()
			// attempt to mint tokens
			expect(property.mint(100, { value })).to.eventually.be.rejected
		})

		it('should allow a wallet to mint, the totalIssuedShares should be updated', async () => {
			const pricePerToken = await property.pricePerShare()
			// mint tokens
			const mintResponse = await property.mint(55, {
				value: (pricePerToken.toNumber() * 55).toFixed(0).toString(),
			})
			await mintResponse.wait()
			// check balance
			const totalShares = await property.totalIssuedShares()
			expect(totalShares).to.eq(55)
		})

	})

	describe('Market place functionality', async () => {

		it('should allow listing of shares owned by a wallet')

		it('should reject listing shares not owned by wallet')

		it('should allow purchasing listed shares')

		it('should reject purchasing listed shares for an incorrect amount')

		it('should allow a wallet which has sold shares to withdraw funds')

	})

	describe('Payment splitting functionality', async () => {

		it('should correctly split payments according to share holders')

	})
})