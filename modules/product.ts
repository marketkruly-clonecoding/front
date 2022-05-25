import { Product, ProductDetail, ProductList } from "@libs/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface ProductState {
  recentViewList: { url: string; id: number }[];
  cartAlarmInfo: null | Product | ProductDetail; // Alarm
  cartWindow: [Info: Product, ListInfo: [] | ProductList[]] | null;
}

const initialState: ProductState = {
  recentViewList: [],
  cartAlarmInfo: null,
  cartWindow: null,
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
    openCartAlarm: (state, action: PayloadAction<Product | ProductDetail>) => {
      state.cartAlarmInfo = action.payload;
    },
    closeCartAlarm: (state) => {
      state.cartAlarmInfo = null;
    },
    openCartWindow: (
      state,
      action: PayloadAction<[Info: Product, ListInfo: [] | ProductList[]]>
    ) => {
      state.cartWindow = action.payload;
    },
    closeCartWindow: (state) => {
      state.cartWindow = null;
    },
  },
});

export const {
  addRecentviewList,
  initRecentviewList,
  openCartAlarm,
  closeCartAlarm,
  openCartWindow,
  closeCartWindow,
} = productSlice.actions;

export default productSlice.reducer;
