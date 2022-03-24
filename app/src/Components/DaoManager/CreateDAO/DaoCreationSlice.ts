import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";

// Define a type for the slice state
interface DAOCreationState {
  name: string;
  proposalPassing: number;
  quorumPercentage: number;
  voteDurationDays: number;
  voteDurationWeeks: number;
  tokenSymbol: string;
  initTokenSupply: number;
  walletAddresses: any;
  walletPercentages: any;
}

// Define the initial state using that type
const initialState: DAOCreationState = {
  name: "",
  proposalPassing: 0,
  quorumPercentage: 0,
  voteDurationDays: 0,
  voteDurationWeeks: 0,
  tokenSymbol: "",
  initTokenSupply: 0,
  walletAddresses: {
    AirDropAddress: 0,
    BurnAddress: 0,
    RealEstateAddress: 0,
    MarketingAddress: 0,
    DeveloperAddress: 0,
  },
  walletPercentages: {
    AirDropWallet: 10,
    Burn: 12,
    RealEstate: 14,
    Marketing: 16,
    Developer: 18,
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
  changeBurnWalletPercentage,
  changeDeveloperWalletPercentage,
  changeMarketingWalletPercentage,
  changeRealEstateWalletPercentage,
  changeAirdropWalletAddress,
  changeBurnWalletAddress,
  changeDeveloperWalletAddress,
  changeMarketingWalletAddress,
  changeRealEstateWalletAddress,
} = DaoCreationSlice.actions;

// Other code such as selectors can use the imported `RootState` type
// export const selectCount = (state: RootState) => state.Alchemy.name;

export const selectCount = (state: RootState) => state.Alchemy.name;
export default DaoCreationSlice.reducer;
