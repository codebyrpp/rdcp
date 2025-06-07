import { createApi, BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { refreshAuth, revokeAuth } from './slices/authSlice';
import { router } from 'expo-router';

// Base URL for the API
const baseUrl = `${process.env.EXPO_PUBLIC_API_DOMAIN}/v1`;

// Fetch base query for API requests
const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: async (headers, { getState }) => {
        const token = (getState() as RootState).auth.accessToken;

        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

// Enhanced base query with token refresh logic
const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        const refreshToken = (api.getState() as RootState).auth.refreshToken;

        if (refreshToken) {
            const refreshResult = await baseQuery({
                url: '/auth/refresh',
                method: 'POST',
                body: { refreshToken },
            }, api, extraOptions);

            if (refreshResult.data) {
                const { accessToken } = refreshResult.data as { accessToken: string };
                api.dispatch(refreshAuth({ accessToken }));

                // Retry the original query with the new token
                result = await baseQuery(args, api, extraOptions);
            } else {
                api.dispatch(revokeAuth());
                router.replace('/login');
            }
        } else {
            api.dispatch(revokeAuth());
            router.replace('/login');
        }
    }

    return result;
};

// Initialize the API slice with no endpoints
export const apiSlice = createApi({
    baseQuery: baseQueryWithReAuth,
    endpoints: () => ({}), // Empty endpoints since we will inject them later
});

export default apiSlice;
