import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  address: string;
}

const initialState: UserState = {
  address: "",
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    inputSelectAddress: (state, action: PayloadAction<string>) => {
      state.address = action.payload;
    },
  },
});

export const { inputSelectAddress } = userSlice.actions;

export default userSlice.reducer;
