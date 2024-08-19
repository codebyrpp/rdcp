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
    }),
});

export const { useGetProjectsQuery } = projectsApiSlice;