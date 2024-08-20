import { PROJECT_ROUTE, PROJECT_SETTINGS_ROUTE } from "@/constants/routes"
import { useNavigate } from "react-router-dom"

const useProject = () => {

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

    return {
        navigateToProject,
        navigateToProjectSettings,
    }
}

export default useProject