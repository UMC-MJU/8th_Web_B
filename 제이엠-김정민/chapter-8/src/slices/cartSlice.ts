import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import cartItems from "../constants/cartItems";
import type { CartItems } from "../types/cart";

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

// cartSlice 생성
// createSlice -> reduxToolkit에서 제공

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Todo: 증가
    increase: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.amount += 1; // 아이템의 수량 증가
      } else {
        console.error(`아이템 ID ${itemId}를 찾을 수 없습니다.`);
      }
    },
    // Todo: 감소
    decrease: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      const item = state.cartItems.find((cartItem) => cartItem.id === itemId);
      if (item) {
        item.amount -= 1; // 아이템의 수량 감소
      } else {
        console.error(`아이템 ID ${itemId}를 찾을 수 없습니다.`);
      }
    },
    // Todo: removeItem 아이템 제거
    removeItem: (state, action: PayloadAction<{ id: string }>) => {
      const itemId = action.payload.id;
      state.cartItems = state.cartItems.filter(
        (cartItem): boolean => cartItem.id !== itemId
      );
    },
    // Todo: clearCart 장바구니 비우기
    clearCart: (state) => {
      state.cartItems = [];
    },
    // Todo: 총액계산
    calculateTottal: (state) => {
      let amount = 0;
      let total = 0;

      state.cartItems.forEach((item) => {
        amount += item.amount; // 총 아이템 수량 계산
        total += item.amount * item.price; // 총액 계산
      });
      state.amount = amount; // 상태에 총 아이템 수량 저장
      state.total = total; // 상태에 총액 저장
    },
  },
});

export const { increase, decrease, removeItem, clearCart, calculateTottal } =
  cartSlice.actions;

const cartReducer = cartSlice.reducer;

export default cartReducer;
