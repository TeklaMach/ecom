import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../pages/types/Types';

interface CartState {
  cartItems: Product[];
}

const initialState: CartState = {
  cartItems: [],
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<Product>) => {
      const item = state.cartItems.find((item) => item.id === action.payload.id);
      if (item) {
        // Item already exists in the cart, update its quantity
        item.amount += 1;
      } else {
        // Item doesn't exist in the cart, add it
        state.cartItems.push({ ...action.payload, amount: 1 });
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
        const itemId = action.payload;
        state.cartItems = state.cartItems.filter((item) => item.id !== itemId);
      },
    resetCart: (state) => {
      state.cartItems = [];
    },
  },
});

export const { addToCart, removeFromCart, resetCart } = cartSlice.actions;

export default cartSlice.reducer;
