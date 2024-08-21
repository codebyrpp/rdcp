import { FORM_SETTINGS_ROUTE, PROJECT_ROUTE, PROJECT_SETTINGS_ROUTE, PROJECTS_ROUTE } from "@/constants/routes"
import { useNavigate } from "react-router-dom"

const useProjectNavigation = () => {

    const navigate = useNavigate()

    const navigateToProject = (projectId: string) => {
        // Open the project
        const route = PROJECT_ROUTE.replace(':projectId', projectId)
        navigate(route);
    }

    const navigateToProjectSettings = (projectId: string) => {
        // Open the project settings
        const route = `${PROJECT_SETTINGS_ROUTE.replace(':projectId', projectId)}`
        navigate(route);
    }

    const navigateToAllProjects = () => {
        navigate(PROJECTS_ROUTE);
    }

    const navigateToFormSettings = (projectId: string, formId: string) => {
        // Open the form settings
        const route = FORM_SETTINGS_ROUTE.replace(':projectId', projectId).replace(':formId', formId)
        navigate(route);
    }

    return {
        navigateToProject,
        navigateToProjectSettings,
        navigateToAllProjects,
        navigateToFormSettings
    }
}

export default useProjectNavigation