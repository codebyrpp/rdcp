import { Form } from "@/models/forms";
import { apiSlice } from "../api";

interface ProjectResponseDto {
    forms: Form[];
    roles: any[];
}

export const formsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getForms: builder.query<ProjectResponseDto, string>({
            query: (projectId) => ({
                url: `forms/${projectId}`,
                method: 'GET',
            }),
        }),
        createForm: builder.mutation<any, {projectId: string}>({
            query: (body) => ({
                url: 'forms',
                method: 'POST',
                body
            }),
        }),
    }),
});

export const { useGetFormsQuery, useCreateFormMutation } = formsApiSlice;