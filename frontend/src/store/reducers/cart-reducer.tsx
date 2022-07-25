import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../generated/swagger/shop-it";

interface CartState {
  products: Product[];
}

const initialState: CartState = {
  products: [],
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      state.products = [...state.products, action.payload];
    },
    clearCart: (state, action: PayloadAction<void>) => {
      state.products = [];
    },
  },
});

export const { addToCart, clearCart } = cartSlice.actions;
