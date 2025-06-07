import { Project } from "@/models/projects";
import { apiSlice } from "../api";
import { FORM_TAG, PROJECT_TAG } from "../tags";

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], void>({
            query: () => ({
                url: 'projects',
                method: 'GET'
            }),
            providesTags: [PROJECT_TAG]
        }),
        createProject: builder.mutation<Project, Partial<Project>>({
            query: (body) => ({
                url: 'projects',
                method: 'POST',
                body
            }),
            invalidatesTags: [PROJECT_TAG]
        }),
        getProject: builder.query<ProjectDTO, string>({
            query: (projectId) => ({
                url: `projects/${projectId}`,
                method: 'GET',
            }),
            providesTags: [PROJECT_TAG, FORM_TAG]
        }),
        getProjectWithForms: builder.query<ProjectDTO, { projectId: string }>({
            query: ({ projectId }) => ({
                url: `projects/${projectId}?forms=true`,
                method: 'GET',
            }),
            providesTags: [PROJECT_TAG, FORM_TAG]
        }),
        updateProject: builder.mutation<any, Partial<Project>>({
            query: (body) => ({
                url: 'projects',
                method: 'PATCH',
                body
            }),
            invalidatesTags: [PROJECT_TAG]
        }),
        deleteProject: builder.mutation<any, { projectId: string }>({
            query: ({ projectId }) => ({
                url: `projects/${projectId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [PROJECT_TAG]
        }),
    }),
});

export interface ProjectDTO extends Project {

}

export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useGetProjectWithFormsQuery,
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectsApiSlice;