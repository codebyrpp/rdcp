import { apiSlice } from "../api";
import { ProjectRole, Collaborator } from "@/models/projects";

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

interface FetchCollaboratorsRequest {
  projectId: string;
}

export const inviteMembersApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addCollaborators: builder.mutation<AddCollaboratorDTO[], AddCollaboratorsRequest>({
      query: ({ projectId, emails, roles }) => ({
        url: `projects/${projectId}/settings`, 
        method: 'POST',
        body: { emails, roles }, 
      }),
    }),

    updateCollaboratorRoles: builder.mutation<AddCollaboratorDTO, UpdateCollaboratorRolesRequest>({
      query: ({ projectId, collaboratorId, roles }) => ({
        url: `projects/${projectId}/settings/${collaboratorId}`,
        method: 'PATCH',
        body: { roles }, 
      }),
    }),

    removeCollaborator: builder.mutation<{ message: string }, RemoveCollaboratorRequest>({
      query: ({ projectId, collaboratorId }) => ({
        url: `projects/${projectId}/settings/${collaboratorId}`,
        method: 'DELETE',
      }),
    }),

    fetchCollaborators: builder.query<Collaborator[], FetchCollaboratorsRequest>({
      query: ({ projectId }) => ({
        url: `projects/${projectId}/settings`,
        method: 'GET',
      }),
    }),
  }),
});

export const {
  useAddCollaboratorsMutation,
  useUpdateCollaboratorRolesMutation,
  useRemoveCollaboratorMutation,
  useFetchCollaboratorsQuery,
} = inviteMembersApiSlice;
