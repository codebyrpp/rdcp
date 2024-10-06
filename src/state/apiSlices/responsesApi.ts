import { apiSlice } from "../api"

export const responsesApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getResponses: builder.mutation<any, { formId: string, page?: number, limit?: number }>({
            query: ({ formId,page = 1, limit = 10 }) => ({
                url: `submissions/form/${formId}/responses?page=${page}&limit=${limit}`,
                method: 'GET',
            }),
        }),
    }),
})

export const {
    useGetResponsesMutation,
} = responsesApiSlice;