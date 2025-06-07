import { Form } from "@/models/form";
import { apiSlice } from "../api";

export const formsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getForm: builder.query<Form, { formId: string }>({
            query: ({ formId }) => ({
                url: `forms/${formId}`,
                method: 'GET',
            }),
        }),
    }),
});

export const { 
    useGetFormQuery,
} = formsApiSlice;