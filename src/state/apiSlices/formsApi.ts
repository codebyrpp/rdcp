import { Form, FormWithSchema } from "@/models/forms";
import { apiSlice } from "../api";
import { ProjectRole } from "@/models/projects";
import { FORM_TAG } from "../tags";
import { FormElementInstance } from "@/components/builder/components/FormElements";

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
            invalidatesTags: [FORM_TAG]
        }),
        getForm: builder.query<Form | FormWithSchema, { formId: string, schema?: boolean }>({
            query: ({ formId, schema = false }) => ({
                url: `forms/${formId}?schema=${schema}`,
                method: 'GET',
            }),
        }),
        updateForm: builder.mutation<Form, { formId: string }>({
            query: ({ formId, ...body }) => ({
                url: `forms/${formId}`,
                method: 'PATCH',
                body
            }),
            invalidatesTags: [FORM_TAG]
        }),
        deleteForm: builder.mutation<Form, { formId: string }>({
            query: ({ formId }) => ({
                url: `forms/${formId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [FORM_TAG]
        }),
        saveForm: builder.mutation<Form, { formId: string, schema: FormElementInstance[] }>({
            query: ({ formId, schema }) => ({
                url: `forms/${formId}/save-form`,
                method: 'POST',
                body: {
                    data: schema
                }
            }),
        }),
        publishForm: builder.mutation<Form, { formId: string }>({
            query: ({ formId }) => ({
                url: `forms/${formId}/publish`,
                method: 'PATCH',
            }),
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

    // The following mutations are used for form editing
    useSaveFormMutation,
    usePublishFormMutation,
    useKeepAliveMutation,
    useAcquireLockMutation,
    useReleaseLockMutation
} = formsApiSlice;