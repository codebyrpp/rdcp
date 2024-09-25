import { Form } from "@/models/forms";
import { apiSlice } from "../api";
import { ProjectRole } from "@/models/projects";
import { FORM_TAG } from "../tags";

export interface ProjectDTO {
    id: string;
    name: string;
    description: string;
    roles: ProjectRole[];
    forms?: Form[];
}

export type LockResponseDto = {
    success: boolean;
    user?: string;
};

export const formsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createForm: builder.mutation<Form, { projectId: string }>({
            query: (body) => ({
                url: 'forms',
                method: 'POST',
                body
            }),
            invalidatesTags:[FORM_TAG]
        }),
        getForm: builder.query<Form, { formId: string }>({
            query: ({ formId }) => ({
                url: `forms/${formId}`,
                method: 'GET',
            }),
        }),
        updateForm: builder.mutation<Form, { formId: string }>({
            query: ({ formId, ...body }) => ({
                url: `forms/${formId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags:[FORM_TAG]
        }),
        deleteForm: builder.mutation<Form, { formId: string }>({
            query: ({ formId }) => ({
                url: `forms/${formId}`,
                method: 'DELETE',
            }),
            invalidatesTags:[FORM_TAG]
        }),
        keepAlive: builder.mutation<Form, { formId: string }>({
            query: ({ formId }) => ({
                url: `forms/${formId}/keep-alive`,
                method: 'POST',
            }),
        }),
        acquireLock: builder.mutation<LockResponseDto, { formId: string }>({
            query: ({ formId }) => ({
                url: `forms/${formId}/lock`,
                method: 'POST',
            }),
        }),
        releaseLock: builder.mutation<Form, { formId: string }>({
            query: ({ formId }) => ({
                url: `forms/${formId}/release-lock`,
                method: 'POST',
            }),
        }),
    }),
});

export const { 
    useCreateFormMutation,
    useGetFormQuery,
    useUpdateFormMutation,
    useDeleteFormMutation,
    useKeepAliveMutation,
    useAcquireLockMutation,
    useReleaseLockMutation
} = formsApiSlice;