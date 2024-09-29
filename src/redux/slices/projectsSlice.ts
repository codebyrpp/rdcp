import { Project } from "@/models/project";
import { createSlice } from "@reduxjs/toolkit";

export interface ProjectsState {
    projects: Project[];
}

const initialState: ProjectsState = {
    projects: [],
};

export const projectsSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        setProjects: (state, action) => {
            state.projects = action.payload;
        }
    },
});

