import { createSlice } from "@reduxjs/toolkit";
import productData from "../productsData";

const productSlice = createSlice({
  name: "mobile",
  initialState: {
    allProducts: productData,
    cart: []
  },
  reducers: {
    addToCart: (state, action) => {
      const duplicateIndex = state.cart.findIndex((value) => {
        return value.id === action.payload.id;
      });
      if (duplicateIndex >= 0) {
        state.cart[duplicateIndex].quantity += 1;
      } else {
        state.cart.push(action.payload);
      }
    },
    incrementQuantity: (state, action) => {
      const item = state.cart.find((value) => value.id === action.payload);
      item.quantity += 1;
    },
    decrementQuantity: (state, action) => {
      const item = state.cart.find((value) => value.id === action.payload);
      const itemIndex = state.cart.findIndex(
        (value) => value.id === action.payload
      );
      if (item.quantity === 1) {
        state.cart.splice(itemIndex, 1);
      } else {
        item.quantity -= 1;
      }
    },
    deleteProduct: (state, action) => {
    const productIndex = state.cart.findIndex((value)=>value.id === action.payload);
    state.cart.splice(productIndex, 1);
     
    },
  },
});

export default productSlice.reducer;
export const {
  addToCart,
  deleteProduct,
  incrementQuantity,
  decrementQuantity,
} = productSlice.actions;
