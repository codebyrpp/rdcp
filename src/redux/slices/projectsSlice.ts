import { Form } from "@/models/form";
import { Project } from "@/models/project";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface ProjectsState {
  projects: Project[];
}

const initialState: ProjectsState = {
  projects: [],
};

export const projectsSlice = createSlice({
  name: "projects",
  initialState,
  reducers: {
    setProjects: (state, action) => {
      state.projects = action.payload;
    },
    updateProjectForms(
      state,
      action: PayloadAction<{ projectId: string; forms: Form[] }>
    ) {
      const { projectId, forms } = action.payload;
      const project = state.projects.find(
        (project) => project.id === projectId
      );
      if (project) {
        project.forms = forms; // Update the forms for the specific project
      }
    },
  },
});

export const { setProjects, updateProjectForms } = projectsSlice.actions;

export default projectsSlice.reducer;
