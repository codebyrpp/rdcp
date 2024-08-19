import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';

const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl,
        prepareHeaders: (headers, { getState }) => {
            // Get the JWT token from the state
            const token = (getState() as RootState).session.token;

            // If exists, include it in the Authorization header
            if (token) {
                headers.set('Authorization', `Bearer ${token}`);
            }

            return headers;
        },
    }),
    endpoints: (_) => ({}),
});