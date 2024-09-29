import {
  configureStore,
  ThunkAction,
  Action,
  Tuple,
  StoreEnhancer,
  combineReducers,
} from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import { offline } from "@redux-offline/redux-offline";
import offlineConfig from "@redux-offline/redux-offline/lib/defaults";
import apiSlice from "./api";
import persistReducer from "redux-persist/es/persistReducer";
import { PERSIST, REHYDRATE, persistStore } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig = {
  key: "root",
  storage: AsyncStorage,
};

const rootReducer = combineReducers({
  auth: authReducer,
  [apiSlice.reducerPath]: apiSlice.reducer,
});

const offlineEnhancer = offline(offlineConfig);

export const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [PERSIST, REHYDRATE],
      },
    }).concat(apiSlice.middleware),
  // enhancers: () => new Tuple(offlineEnhancer as StoreEnhancer),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
