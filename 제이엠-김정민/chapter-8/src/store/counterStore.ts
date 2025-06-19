import { create } from "zustand";

// Actions에 대한 정의
interface CounterActions {
  increment: () => void;
  decrement: () => void;
  random: () => void;
}

// value에 대한 정의
interface CounterState {
  count: number;
  // randomNumber
  randomNumber: number;

  action: CounterActions;
}

export const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  randomNumber: 0,

  action: {
    increment: () =>
      set((state) => ({
        count: state.count + 1,
      })),

    decrement: () =>
      set((state) => ({
        count: state.count - 1,
      })),
    //0~99 사이의 랜덤 숫자
    random: () =>
      set(() => ({
        randomNumber: Math.floor(Math.random() * 100),
      })),
  },
}));

// action에 관한 훅을 하나 만들 수 있음.
export const useCounterActions = () => useCounterStore((state) => state.action);
