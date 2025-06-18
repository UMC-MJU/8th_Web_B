import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../slices/cartSlice";
import modalReducer from "../slices/modalSlice";

// 1. 저장소 생성
function createStore() {
  const store = configureStore({
    // 2. 리듀서 설정
    reducer: {
      cart: cartReducer,
      modal: modalReducer,
    },
  });

  return store;
}

// store를 활용할 수 있도록 내보내야 함.
// 여기서 실행해서 스토어를 빼준다.
// 싱글톤패턴
const store = createStore();

export default store;

// 타입스크립트에서 스토어의 상태와 디스패치 타입을 추출
// RootState는 스토어의 상태 타입을 나타내고, AppDispatch는 디스패치 함수의 타입을 나타냅니다.
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
