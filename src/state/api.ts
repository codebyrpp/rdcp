
import { PROJECT_TAG, FORM_TAG } from './tags';
import { createApi } from '@reduxjs/toolkit/query/react';
import baseQueryWithReAuth from './baseQueryReAuth';

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: baseQueryWithReAuth,
    tagTypes: [PROJECT_TAG, FORM_TAG],
    endpoints: (_) => ({}),
});