import cartItems from "../constants/cartItems";
import { create } from "zustand";
// import { calculateTottal, increase, removeItem } from "../slices/cartSlice";
import type { CartItems } from "../types/cart";
import { immer } from "zustand/middleware/immer";
import { useShallow } from "zustand/shallow";

interface CartActions {
  increase: (id: string) => void;
  decrease: (id: string) => void;
  removeItem: (id: string) => void;
  clearCart: () => void;
  calculateTotals: () => void;
}

interface CartState {
  cartItems: CartItems;
  amount: number;
  total: number;
  // actions에 대한 정의
  actions: CartActions;
}

export const useCartStore = create<CartState>()(
  immer((set, _) => ({
    cartItems: cartItems,
    amount: 0,
    total: 0,
    actions: {
      increase: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem) {
            cartItem.amount += 1; // 아이템의 수량 증가
          }
        });
      },

      decrease: (id: string) => {
        set((state) => {
          const cartItem = state.cartItems.find((item) => item.id === id);
          if (cartItem && cartItem.amount > 0) {
            cartItem.amount -= 1; // 아이템의 수량 감소
          }
        });
      },
      removeItem: (id: string) => {
        set((state) => {
          state.cartItems = state.cartItems.filter((item) => item.id !== id);
        });
      },
      clearCart: () => {
        set((state) => {
          state.cartItems = [];
        });
      },
      calculateTotals: () => {
        set((state) => {
          let amount = 0;
          let total = 0;

          state.cartItems.forEach((item) => {
            amount += item.amount; // 총 아이템 수량 계산
            total += item.price * item.amount; // 총액 계산
          });

          state.amount = amount;
          state.total = total;
        });
      },
    },
  }))
);

export const useCartInfo = () =>
  useCartStore(
    useShallow((state) => ({
      cartItems: state.cartItems,
      amount: state.amount,
      total: state.total,
    }))
  );

export const useCartActions = () =>
  useCartStore((state) => {
    return state.actions;
  });
