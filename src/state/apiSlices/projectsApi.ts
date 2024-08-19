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
    }),
});

export const { useGetProjectsQuery, useCreateProjectMutation } = projectsApiSlice;