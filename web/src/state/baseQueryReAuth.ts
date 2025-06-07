import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { RootState } from './store';
import { refreshSession, revokeSession } from './slices/session';

const baseUrl = `${import.meta.env.VITE_APP_API_BASE}/v1`;

const baseQuery = fetchBaseQuery({
    baseUrl,
    prepareHeaders: (headers, { getState }) => {
        // Get the JWT token from the state
        const token = (getState() as RootState).session.accessToken;

        // If exists, include it in the Authorization header
        if (token) {
            headers.set('Authorization', `Bearer ${token}`);
        }

        return headers;
    },
});

const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args, api, extraOptions) => {
    let result = await baseQuery(args, api, extraOptions);

    if (result.error && result.error.status === 401) {
        // If we got a 401, try refreshing the token
        const refreshResult = await baseQuery({
            url: '/auth/refresh',
            method: 'POST',
            body: {
                refreshToken: (api.getState() as RootState).session.refreshToken
            }
        }, api, extraOptions) as { data: { accessToken: string } };

        if (refreshResult.data) {
            // Save the new token
            api.dispatch(refreshSession({
                accessToken: refreshResult.data.accessToken
            }));

            // Retry the original query with the new token
            result = await baseQuery(args, api, extraOptions);
        } else {
            // If the refresh token failed, log out the user
            api.dispatch(revokeSession());
            if(window.location.pathname !== '/login')
                window.location.href = '/login';
        }
    }

    return result;
};

export default baseQueryWithReAuth;