import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { apiSlice } from '../api';

interface Participant {
  email: string;
  id: string;
}

interface AddParticipantsRequest {
  projectId: string;
  formId: string;
  emails: string[];
}

interface RemoveParticipantRequest {
  projectId: string;
  formId: string
  participantId: string;
}

export const participantApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    fetchParticipants: builder.query<Participant[],  { projectId: string; formId: string }>({
      query: ({ projectId, formId }) => `projects/${projectId}/forms/${formId}/settings`,
    }),
    addParticipants: builder.mutation<Participant[], AddParticipantsRequest>({
      query: ({ projectId, formId, emails }) => ({
        url: `projects/${projectId}/forms/${formId}/settings`,
        method: 'POST',
        body: { emails },
      }),
    }),
    removeParticipant: builder.mutation<{ message: string }, RemoveParticipantRequest>({
      query: ({ projectId, formId, participantId }) => ({
        url: `projects/${projectId}/forms/${formId}/settings${participantId}`,
        method: 'DELETE',
      }),
    }),
  }),
});

export const {
  useFetchParticipantsQuery,
  useAddParticipantsMutation,
  useRemoveParticipantMutation,
} = participantApiSlice;