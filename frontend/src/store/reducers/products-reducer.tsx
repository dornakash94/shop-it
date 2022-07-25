import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Product } from "../../generated/swagger/shop-it";

interface ProductsState {
  products: Product[];
}

const initialState: ProductsState = {
  products: [],
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.products = action.payload;
    },
    addProducts: (state, action: PayloadAction<Product[]>) => {
      const productMap = new Map(
        state.products.map((product) => [product.id, product])
      );
      const changesMap = new Map(
        action.payload.map((product) => [product.id, product])
      );

      const combined = new Map([...productMap, ...changesMap]);

      state.products = Array.from(combined.values()).sort((a, b) => {
        const aid = a.id || 0;
        const bid = b.id || 0;

        return bid - aid;
      });
    },
    deleteProduct: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      const productsWithoutProductId = state.products.filter(
        (product) => product.id !== productId
      );
      state.products = productsWithoutProductId;
    },
  },
});

export const { setProducts, addProducts, deleteProduct } =
  productsSlice.actions;
