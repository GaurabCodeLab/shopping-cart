import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./productSlice";

const store = configureStore({
  reducer: {
    product: rootReducer,
  },
});

export default store;