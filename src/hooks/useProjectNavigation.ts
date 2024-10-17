import {
  FORM_EDIT_ROUTE,
  FORM_RESPONSES_ROUTE,
  FORM_SETTINGS_ROUTE,
  FORM_VIEW_ROUTE,
  PROJECT_ROUTE,
  PROJECT_SETTINGS_ROUTE,
  PROJECTS_ROUTE,
} from "@/constants/routes";
import { Form } from "@/models/forms";
import { Project, ProjectRole } from "@/models/projects";
import { useLocation, useNavigate } from "react-router-dom";

const useProjectNavigation = () => {
  const { state } = useLocation();
  const project = state?.project;
  const form = state?.form;

  const navigate = useNavigate();

  const navigateToProject = (project: Project) => {
    // Open the project
    navigate(PROJECT_ROUTE, {
      state: { project },
    });
  };

  const navigateToProjectSettings = (projectId: string) => {
    // Open the project settings
    const project = {
      id: projectId,
    } as Project;

    navigate(PROJECT_SETTINGS_ROUTE, {
      state: { project },
    });
  };

  const navigateToAllProjects = () => {
    navigate(PROJECTS_ROUTE);
  };

  const navigateToFormSettings = (form: Form) => {
    // Open the form settings
    navigate(FORM_SETTINGS_ROUTE, {
      state: { project: { id: form.projectId }, form: { id: form.id, name: form.name } },
    });
  };

  const navigateToFormResponses = (project: Project, form: Form) => {
    // Open the form responses
    navigate(FORM_RESPONSES_ROUTE, {
      state: { project, form },
    });
  };

  const navigateToForm = (formId: string) => {
    // Open the form
    const route = FORM_VIEW_ROUTE.replace(":formId", formId);
    // open in new tab
    window.open(route, "_blank");
  };

  const navigateToFormDesigner = (projectId: string, formId: string) => {
    // Open the form designer
    navigate(FORM_EDIT_ROUTE, {
      state: { project: { id: projectId }, form: { id: formId } },
    });
  };

  return {
    project,
    form,
    navigateToProject,
    navigateToProjectSettings,
    navigateToAllProjects,
    navigateToFormSettings,
    navigateToFormResponses,
    navigateToForm,
    navigateToFormDesigner,
  };
};

export default useProjectNavigation;
