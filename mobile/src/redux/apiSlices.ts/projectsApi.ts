import { Project } from "@/models/project";
import { apiSlice } from "../api";

export const projectsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProjects: builder.query<Project[], void>({
            query: () => ({
                url: 'projects',
                method: 'GET'
            }),
        }),
        getProject: builder.query<ProjectDTO, string>({
            query: (projectId) => ({
                url: `projects/${projectId}`,
                method: 'GET',
            }),
        }),
        getProjectWithForms: builder.query<ProjectDTO, { projectId: string }>({
            query: ({ projectId }) => ({
                url: `projects/${projectId}?forms=true`,
                method: 'GET',
            }),
        }),
    }),
});

export interface ProjectDTO extends Project {

}

export const {
    useGetProjectsQuery,
    useGetProjectQuery,
    useGetProjectWithFormsQuery,
} = projectsApiSlice;