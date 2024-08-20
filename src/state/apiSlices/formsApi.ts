import { Form } from "@/models/forms";
import { apiSlice } from "../api";
import { ProjectRole } from "@/models/user";

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
            async onQueryStarted({ projectId }, { dispatch, queryFulfilled }) {
                try {
                    const { data: newForm } = await queryFulfilled;

                    // Optimistically update the getProject cache with the new form
                    dispatch(apiSlice.util.updateQueryData('getProject', projectId, (draft: ProjectDTO) => {
                        console.log('Updating the project with the new form:', draft, newForm);
                        if (draft.forms) {
                            draft.forms.push(newForm);
                        } else {
                            draft.forms = [newForm];
                        }
                    }));

                } catch (error) {
                    console.error('Failed to update the project with the new form:', error);
                }
            },
        }),
    }),
});

export const { useCreateFormMutation } = formsApiSlice;