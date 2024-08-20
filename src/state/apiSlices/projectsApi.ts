import { Project } from "@/models/projects";
import { apiSlice } from "../api";

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], void>({
            query: () => ({
                url: 'projects',
                method: 'GET'
            }),
        }),
        createProject: builder.mutation<Project, Partial<Project>>({
            query: (body) => ({
                url: 'projects',
                method: 'POST',
                body
            }),
        }),
        getProject: builder.query<ProjectDTO, {projectId: string, withForms: boolean}>({
            query: ({
                projectId,
                withForms
            }) => ({
                url: `projects/${projectId}?forms={${withForms}}`,
                method: 'GET',
            }),
        }),
        updateProject: builder.mutation<any, Partial<Project>>({
            query: (body) => ({
                url: 'projects',
                method: 'PATCH',
                body
            }),
        }),
        deleteProject: builder.mutation<any, {projectId: string}>({
            query: ({projectId}) => ({
                url: `projects/${projectId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export interface ProjectDTO extends Project{

}

export const { 
    useGetProjectsQuery,
    useGetProjectQuery, 
    useCreateProjectMutation,
    useUpdateProjectMutation,
    useDeleteProjectMutation
} = projectsApiSlice;