import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface UserState {
  user: { userIdx: string; name: string };
}

const initialState: UserState = {
  user: { userIdx: "", name: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (
      state,
      action: PayloadAction<{ userIdx: string; name: string }>
    ) => {
      state.user = action.payload;
    },
    logout: (state) => {
      state.user = { userIdx: "", name: "" };
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
