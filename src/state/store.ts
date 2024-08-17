import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from './api';
import sessionReducer from './slices/session';

export const store = configureStore({
    reducer: {
        session: sessionReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(apiSlice.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;