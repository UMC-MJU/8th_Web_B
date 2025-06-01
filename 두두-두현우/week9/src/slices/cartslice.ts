import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartitems";

export interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
}

const initialState: CartState = {
  cartItems: cartItems,
  amount: 0,
  total: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // TODO: 증가
    increase: (state, action: PayloadAction<{ id: string }>) => {
      // di를 통해서, 전체 음반 중 내가 선택한 아이템을 찾는다
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        // 아이템이 존재하면, amount를 증가시킨다
        item.amount += 1;
      }
    },
    // TODO: 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      // di를 통해서, 전체 음반 중 내가 선택한 아이템을 찾는다
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        // 아이템이 존재하면, amount를 증가시킨다
        item.amount -= 1;
      }
    },
    // TODO: removeItem 아이템 제거
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter(
        (cartItem) => cartItem.id !== itemId
      );
    },
    // TODO: clearCart 장바구니 비우기

    clearCart: (state) => {
      state.cartItems = [];
    },

    // TODO: 총액 계산
    calculateTotals: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount;
        total += item.price * item.amount;
      });

      state.amount = amount;
      state.total = total;
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTotals } =
  cartSlice.actions;

// duck Pattern
const cartReducer = cartSlice.reducer;
export default cartReducer;
