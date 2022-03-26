import { ethers } from "hardhat";
import { DAOFactory } from "../typechain";

async function main() {
  // const propertyFactory = await ethers.getContractFactory('Property')
  // let propertyContract = await propertyFactory.deploy()
  // console.log('Property Contract Address = ', propertyContract.address)
  // console.log('Property Txn Hash = ', propertyContract.deployTransaction.hash)
  // console.log('Deployed By = ', propertyContract.deployTransaction.from)
  // await propertyContract.deployed()
  const DAOFactory = await ethers.getContractFactory("DAOFactory");
  let DAOFactoryContract = await DAOFactory.deploy();
  console.log("DAO Contract Address = ", DAOFactoryContract.address);
  console.log("DAO Txn Hash = ", DAOFactoryContract.deployTransaction.hash);
  console.log("Deployed By = ", DAOFactoryContract.deployTransaction.from);
  await DAOFactoryContract.deployed();

  /**
   -- Example --
   const txn = await propertyContract.doSomething()
   const response = await txn.wait()
   */
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
