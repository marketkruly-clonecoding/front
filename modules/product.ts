import { Product } from "@libs/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  recentViewList: { url: string; id: number }[];
  cartWindowInfoInList: null | Product;
}

const initialState: ProductState = {
  recentViewList: [],
  cartWindowInfoInList: null,
};

export const productSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    initRecentviewList: (state) => {
      const recentList = localStorage.getItem("wekurlyRecentList");
      if (recentList) {
        state.recentViewList = JSON.parse(recentList);
      }
    },
    addRecentviewList: (
      state,
      action: PayloadAction<{ url: string; id: number }>
    ) => {
      const inIndex = state.recentViewList.findIndex(
        (item) => item.id === action.payload.id
      );
      const newViewList = [...state.recentViewList];
      if (inIndex !== -1) {
        newViewList.unshift(newViewList.splice(inIndex, 1)[0]);
      } else {
        if (newViewList.length >= 10) {
          newViewList.pop();
        }
        newViewList.unshift(action.payload);
      }
      state.recentViewList = newViewList;
      localStorage.setItem("wekurlyRecentList", JSON.stringify(newViewList));
    },
    openCartWindow: (state, action: PayloadAction<Product>) => {
      state.cartWindowInfoInList = action.payload;
    },
    closeCartWindow: (state) => {
      state.cartWindowInfoInList = null;
    },
  },
});

export const {
  addRecentviewList,
  initRecentviewList,
  openCartWindow,
  closeCartWindow,
} = productSlice.actions;

export default productSlice.reducer;
