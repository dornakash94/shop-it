import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./reducers/cart-reducer";
import { productsSlice } from "./reducers/products-reducer";

const store = configureStore({
  reducer: {
    productState: productsSlice.reducer,
    cartState: cartSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
export const productStateSelector = (state: RootState) => state.productState;
export const cartStateSelector = (state: RootState) => state.cartState;

export default store;
