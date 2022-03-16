import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../../../store";

// Define a type for the slice state
interface CounterState {
  value: string;
}

// Define the initial state using that type
const initialState: CounterState = {
  value: "DefaultDAOName",
};

export const nameSlice = createSlice({
  name: "name",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    // Use the PayloadAction type to declare the contents of `action.payload`
    changeName: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

export const { changeName } = nameSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCount = (state: RootState) => state.name.value;

export default nameSlice.reducer;
