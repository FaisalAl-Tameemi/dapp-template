import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";

// Define a type for the slice state
interface DAOCreationState {
  name: string;
  proposalPassing: number;
  quorumPercentage: number;
  voteDurationDays: number;
  voteDurationWeeks: number;
  tokenName: string;
  tokenSymbol: string;
  initTokenSupply: number;
  walletAddresses: any;
  walletPercentages: any;
}

// Define the initial state using that type
const initialState: DAOCreationState = {
  name: "Quinta DAO",
  proposalPassing: 50,
  quorumPercentage: 20,
  voteDurationDays: 0,
  voteDurationWeeks: 1,
  tokenName: "Quinta DAO Token",
  tokenSymbol: "QPDT",
  initTokenSupply: 10 ** 9,
  walletAddresses: {
    AirDropAddress: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
    LiquidityAddress: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
    BurnAddress: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
    RealEstateAddress: "0x90f79bf6eb2c4f870365e785982e1f101e93b906",
    MarketingAddress: "0x15d34aaf54267db7d7c367839aaf71a00a2c6a65",
    DeveloperAddress: "0x9965507d1a55bcc2695c58ba16fb37d819b0a4dc",
  },
  walletPercentages: {
    AirDropWallet: 20,
    Liquidity: 20,
    Burn: 20,
    RealEstate: 0,
    Marketing: 20,
    Developer: 20,
  },
};

export const DaoCreationSlice = createSlice({
  name: "Dao",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeName: (state, action: PayloadAction<string>) => {
      state.name = action.payload;
    },
    changeProposalPassing: (state, action: PayloadAction<number>) => {
      state.proposalPassing = action.payload;
    },
    changeQuorum: (state, action: PayloadAction<number>) => {
      state.quorumPercentage = action.payload;
    },
    changeVoteDurationDays: (state, action: PayloadAction<number>) => {
      state.voteDurationDays = action.payload;
    },
    changeVoteDurationWeeks: (state, action: PayloadAction<number>) => {
      state.voteDurationWeeks = action.payload;
    },
    changeVoteDuration: (state, action: PayloadAction<string>) => {
      state.tokenSymbol = action.payload;
    },
    changeInitTokenSupply: (state, action: PayloadAction<number>) => {
      state.initTokenSupply = action.payload;
    },
    changeTokenSymbol: (state, action: PayloadAction<string>) => {
      state.tokenSymbol = action.payload;
    },
    changeAirdropWalletPercentage: (state, action: PayloadAction<number>) => {
      state.walletPercentages.AirDropWallet = action.payload;
    },
    changeLiquidityWalletPercentage: (state, action: PayloadAction<number>) => {
      state.walletPercentages.Liquidity = action.payload;
    },
    changeBurnWalletPercentage: (state, action: PayloadAction<number>) => {
      state.walletPercentages.Burn = action.payload;
    },
    changeRealEstateWalletPercentage: (
      state,
      action: PayloadAction<number>
    ) => {
      state.walletPercentages.RealEstate = action.payload;
    },
    changeMarketingWalletPercentage: (state, action: PayloadAction<number>) => {
      state.walletPercentages.Marketing = action.payload;
    },
    changeDeveloperWalletPercentage: (state, action: PayloadAction<number>) => {
      state.walletPercentages.Developer = action.payload;
    },
    ////////////////////////////////////////////////////////////////
    changeAirdropWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddresses.AirDropAddress = action.payload;
    },
    changeLiquidityWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddresses.LiquidityAddress = action.payload;
    },
    changeBurnWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddresses.BurnAddress = action.payload;
    },
    changeRealEstateWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddresses.RealEstateAddress = action.payload;
    },
    changeMarketingWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddresses.MarketingAddress = action.payload;
    },
    changeDeveloperWalletAddress: (state, action: PayloadAction<string>) => {
      state.walletAddresses.DeveloperAddress = action.payload;
    },
  },
});

export const {
  changeName,
  changeProposalPassing,
  changeQuorum,
  changeVoteDurationDays,
  changeVoteDurationWeeks,
  changeVoteDuration,
  changeInitTokenSupply,
  changeTokenSymbol,
  changeAirdropWalletPercentage,
  changeLiquidityWalletPercentage,
  changeBurnWalletPercentage,
  changeDeveloperWalletPercentage,
  changeMarketingWalletPercentage,
  changeRealEstateWalletPercentage,
  changeAirdropWalletAddress,
  changeLiquidityWalletAddress,
  changeBurnWalletAddress,
  changeDeveloperWalletAddress,
  changeMarketingWalletAddress,
  changeRealEstateWalletAddress,
} = DaoCreationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.Alchemy.name;

export const selectCount = (state: RootState) => state.Alchemy.name;
export default DaoCreationSlice.reducer;
