import { ethers } from "hardhat"

async function main() {
  // deploy Counter (simple - custom) contract
  const counterFactory = await ethers.getContractFactory('Counter')
  let contract = await counterFactory.deploy()
  console.log('Counter Contract Address = ', contract.address)
  console.log('Counter Txn Hash = ', contract.deployTransaction.hash)
  console.log('Deployed By = ', contract.deployTransaction.from)
  await contract.deployed()
  // deploy Inu (ERC20) countract
  const inuFactory = await ethers.getContractFactory('InuToken')
  let inuContract = await inuFactory.deploy(ethers.utils.parseEther((10 ** 12).toString()))
  console.log('Inu Contract Address = ', inuContract.address)
  console.log('Inu Txn Hash = ', inuContract.deployTransaction.hash)
  console.log('Deployed By = ', inuContract.deployTransaction.from)
  await inuContract.deployed()
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })