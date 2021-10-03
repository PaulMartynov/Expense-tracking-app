import { Action, ThunkAction } from "@reduxjs/toolkit";
import { store } from "../store/store";

export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  ReturnType,
  unknown,
  Action<string>
>;

export type ThunkProps<
  T extends { [K in keyof T]: (...a: never) => AppThunk }
> = {
  [K in keyof T]: (...args: Parameters<T[K]>) => void;
};

export type ReturnState = ReturnType<typeof store.getState>;
