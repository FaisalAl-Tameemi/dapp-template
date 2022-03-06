import { ethers } from "hardhat"
import chaiAsPromised from 'chai-as-promised'
import chai from "chai"
import { solidity } from "ethereum-waffle"
import { Property } from "../typechain/Property"

chai.use(solidity)
chai.use(chaiAsPromised)

const { expect } = chai

describe("Property", () => {
    let property: Property

    beforeEach(async () => {
        // Example
        // const signers = await ethers.getSigners()
        // const counterFactory = await ethers.getContractFactory(
        //     "Counter",
        //     signers[0]
        // )
        // counter = (await counterFactory.deploy()) as Counter
        // await counter.deployed()
        // const initialCount = await counter.getCount()
        // expect(initialCount).to.eq(0)
        // expect(counter.address).to.properAddress
    })

    // describe("some function", async () => {
    //     it("should do something", async () => {
    //     })
    // })
})