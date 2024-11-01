import { configureStore } from "@reduxjs/toolkit";
import { cartSlice } from "./CartSlice";

  // Import the reducer, not the entire slice;

const store = configureStore({
    reducer: {
        cart:cartSlice.reducer ,  // Use the correct reducer here
    },
});

export default store;