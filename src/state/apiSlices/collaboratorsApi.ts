import { apiSlice } from "../api";
import { ProjectRole } from "@/models/projects";

interface AddCollaboratorDTO {
  id: string;
  email: string;
  roles: ProjectRole[];
  message: string;
}

interface AddCollaboratorsRequest {
  projectId: string;
  emails: string[];
  roles: ProjectRole[];
}

interface UpdateCollaboratorRolesRequest {
  projectId: string;
  collaboratorId: string;
  roles: ProjectRole[];
}

interface RemoveCollaboratorRequest {
  projectId: string;
  collaboratorId: string;
}

export const inviteMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCollaborators: builder.mutation<AddCollaboratorDTO[], AddCollaboratorsRequest>({
      query: ({ projectId, emails, roles }) => ({
        url: `projects/${projectId}/invite`, 
        method: 'POST',
        body: { emails, roles }, 
      }),
    }),

    updateCollaboratorRoles: builder.mutation<AddCollaboratorDTO, UpdateCollaboratorRolesRequest>({
      query: ({ projectId, collaboratorId, roles }) => ({
        url: `projects/${projectId}/collaborators/${collaboratorId}/roles`,
        method: 'PATCH',
        body: { roles }, 
      }),
    }),

    removeCollaborator: builder.mutation<{ message: string }, RemoveCollaboratorRequest>({
      query: ({ projectId, collaboratorId }) => ({
        url: `projects/${projectId}/collaborators/${collaboratorId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useAddCollaboratorsMutation,
  useUpdateCollaboratorRolesMutation,
  useRemoveCollaboratorMutation,
} = inviteMembersApiSlice;
