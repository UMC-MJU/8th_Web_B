import { RootState } from "@reduxjs/toolkit/query";
import type { TypedUseSeletorHook } from "react-redux";
import { useDispatch } from "react-redux";

export const useAppDispatch = () => (AppDispatch = useDispatch);
export const useSelector: TypedUseSeletorHook<RootState> = useSelector;
