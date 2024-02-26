import type { Action, ThunkAction } from "@reduxjs/toolkit";
import { combineSlices, configureStore } from "@reduxjs/toolkit";
import { meSlice } from "./features/me/meSlice";

const rootReducer = combineSlices(meSlice);
export type RootState = ReturnType<typeof rootReducer>;
export const makeStore = (preloadedState:any = null) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState || {}
  });
};

export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ThunkReturnType = void> = ThunkAction<
  ThunkReturnType,
  RootState,
  unknown,
  Action
>;
