import { apiSlice } from "../api";

export const formsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getForms: builder.query({
            query: (body) => ({
                url: 'forms',
                method: 'GET',
                body
            }),
        }),
        createForm: builder.mutation({
            query: (body) => ({
                url: 'forms',
                method: 'POST',
                body
            }),
        }),
    }),
});

export const { useGetFormsQuery, useCreateFormMutation } = formsApiSlice;