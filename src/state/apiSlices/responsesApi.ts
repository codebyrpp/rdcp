import { apiSlice } from "../api"

export const responsesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getResponses: builder.mutation<any, { formId: string, page?: number, limit?: number }>({
            query: ({ formId,page = 1, limit = 10 }) => ({
                url: `submissions/form/${formId}/responses?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
        }),
        getAllResponses: builder.mutation<any, { formId: string }>({
            query: ({ formId }) => ({
                url: `submissions/form/${formId}/responses?limit=-1`,
                method: 'GET',
            }),
        }),
        getSummary: builder.mutation<any, { formId: string, field: string }>({
            query: ({ formId, field }) => ({
                url: `submissions/form/${formId}/summary?field=${field}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetResponsesMutation,
    useGetAllResponsesMutation,
    useGetSummaryMutation,
} = responsesApiSlice;