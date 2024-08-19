import { PROJECT_ROUTE } from "@/constants/routes"
import { useNavigate } from "react-router-dom"

const useProject = () => {

    const navigate = useNavigate()
    const navigateToProject = (projectId: string) => {
        // Open the project
        const route = PROJECT_ROUTE.replace(':projectId', projectId)
        navigate(route);
    }

    const createProject = () => {
        // Create a new project
    }

    return {
        navigateToProject,
        createProject
    }
}

export default useProject