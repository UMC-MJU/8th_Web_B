import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ModalState {
  isOpen: boolean;
  modalContent: string;
}

const modalSlice = createSlice({
  name: "modal",
  initialState: {
    isOpen: false,
    modalContent: "",
  } as ModalState,
  reducers: {
    openModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.modalContent = action.payload; // 모달 내용 설정
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.modalContent = ""; // 모달 내용 초기화
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;

const modalReducer = modalSlice.reducer;

export default modalReducer;
