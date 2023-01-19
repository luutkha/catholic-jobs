/* eslint-disable react-hooks/rules-of-hooks */

import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import { useAppSelector } from "./hooks";
import bgColorReducer from "./slices/bg-color.slice";
export function makeStore() {
  return configureStore({
    reducer: { bgColor: bgColorReducer },
  });
}

const store = makeStore();

export type AppDispatch = typeof store.dispatch;

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>;
export type AppState = ReturnType<typeof store.getState>;

export default store;

export const useBgColor = () =>
  useAppSelector((state: AppState) => state.bgColor.backGrColor);
