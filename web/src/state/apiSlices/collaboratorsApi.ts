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
  users: {
    id: string;
    email: string;
  }[];
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
      query: ({ projectId, users, roles }) => ({
        url: `projects/${projectId}/collaborators`, 
        method: 'POST',
        body: { users, roles }, 
      }),
    }),

    updateCollaboratorRoles: builder.mutation<AddCollaboratorDTO, UpdateCollaboratorRolesRequest>({
      query: ({ projectId, collaboratorId, roles }) => ({
        url: `projects/${projectId}/collaborators/${collaboratorId}`,
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

    fetchCollaborators: builder.query<Collaborator[], FetchCollaboratorsRequest>({
      query: ({ projectId }) => ({
        url: `projects/${projectId}/collaborators`,
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
