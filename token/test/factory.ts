import { ethers } from "hardhat";
import chaiAsPromised from "chai-as-promised";
import chai from "chai";
import { solidity } from "ethereum-waffle";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
import { DAOFactory } from "../typechain/DAOFactory";

chai.use(solidity);
chai.use(chaiAsPromised);

const { expect } = chai;

describe("Factory", () => {
  let factory: DAOFactory;
  let signers: SignerWithAddress[];
  let uniswapRouterAddress: string =
    "0x7a250d5630B4cF539739dF2C5dAcb4c659F2488D";

  beforeEach(async () => {
    // Launch a new contract before each test
    signers = await ethers.getSigners();
    // DAOFactory
    const daoFactoryFactory = await ethers.getContractFactory(
      "DAOFactory",
      signers[0]
    );
    factory = (await daoFactoryFactory.deploy()) as DAOFactory;
    await factory.deployed();
  });

  describe("Deploying a DAO via factory", async () => {
    it("should emit a NewDAO event when a new DAO is launched", async () => {
      const launchDAOTxn = await factory.launchDAO(
        "Quinta DAO",
        "Quinta DAO Token",
        "QPDT",
        10 ** 9,
        {
          _airDropContractAddress: signers[1].address,
          _burnWalletAddress: signers[2].address,
          _liquidityWalletAddress: signers[3].address,
          _realEstateWalletAddress: signers[4].address,
          _marketingWalletAddress: signers[5].address,
          _developerWalletAddress: signers[6].address,
        },
        uniswapRouterAddress,
        {
          airdropPercent: 20,
          liquidityPoolPercent: 20,
          burnPercent: 20,
          developerPercent: 20,
          marketingPercent: 20,
        }
      );

      const resp = await launchDAOTxn.wait();
      expect(resp).to.exist;

      const event = resp.events?.find((event) => event.event === "NewDAO");
      expect(event).to.exist;

      const [daoRouterAddress, daoTokenAddress, daoGovernorAddress] =
        event?.args as any;
      console.log(daoRouterAddress, daoTokenAddress, daoGovernorAddress);
    });

    it("", async () => {
      const launchDAOTxn = await factory.launchDAO(
        "Quinta DAO",
        "Quinta DAO Token",
        "QPDT",
        10 ** 9,
        {
          _airDropContractAddress: signers[1].address,
          _burnWalletAddress: signers[2].address,
          _liquidityWalletAddress: signers[3].address,
          _realEstateWalletAddress: signers[4].address,
          _marketingWalletAddress: signers[5].address,
          _developerWalletAddress: signers[6].address,
        },
        uniswapRouterAddress,
        {
          airdropPercent: 20,
          liquidityPoolPercent: 20,
          burnPercent: 20,
          developerPercent: 20,
          marketingPercent: 20,
        }
      );

      const resp = await launchDAOTxn.wait();

      expect(resp).to.exist;
    });
  });
});
