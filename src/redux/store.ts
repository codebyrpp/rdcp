import {
  configureStore,
  ThunkAction,
  Action,
  Tuple,
  StoreEnhancer,
} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import apiSlice from "./api";

const offlineEnhancer = offline(offlineConfig);

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  enhancers: () => new Tuple(offlineEnhancer as StoreEnhancer),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
