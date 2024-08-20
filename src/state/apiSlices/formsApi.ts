import { Form } from "@/models/forms";
import { apiSlice } from "../api";
import { ProjectRole } from "@/models/projects";
import { projectsApiSlice } from "./projectsApi";
import { FORM_TAG } from "../tags";

export interface ProjectDTO {
    id: string;
    name: string;
    description: string;
    roles: ProjectRole[];
    forms?: Form[];
}

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
    }),
});

export const { useCreateFormMutation } = formsApiSlice;