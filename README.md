# Ethereum dApp Template

### Getting Started

Start by deploying the smart contract locally or to a testnet (Rinkeby, Ropsten, etc..)

```
cd ./token
yarn install
npx hardhat node
```

Then in another terminal window and from the `./token` directory, run the following

```
npx hardhat run --network hardhat scripts/deploy.ts
```

The above command will deploy the smart contracts locally via `Hardhat` and print the smart contract address to console



### Tools Used

* [`Web3-React`](https://github.com/NoahZinsmeister/web3-react)
    * Can use injected `web3` directly if you prefer but `web3-react` simplifies some React related features
* [`Ethers.js`](#)
* [`Hardhat`](#)
    * Can run an Ethereum network on localhost
    * Alternatively, use [`Ganache`](https://www.trufflesuite.com/ganache) from the `truffle-suite` instead
* [`Typechain`](#)
    * To auto-generate Typescript interfaces for smart contracts and a useful CLI for deploying the contract
* [`Truffle`](#)
    * For easy smart contract testing
* [`AntDesign`](#)
    * Nice looking components, not related to any blockchain stuff
