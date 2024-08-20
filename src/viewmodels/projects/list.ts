import { useEffect, useState } from "react"
import { useGetProjectsQuery } from "@/state/apiSlices/projectsApi"

export const useProjectsViewModel = () => {
    // Fetch projects using the query hook
    const { data: projectsData, isLoading, isError, error } = useGetProjectsQuery();

    // Local state to manage projects if you want to manipulate them
    const [projects, setProjects] = useState<any[]>([]);

    // Populate the local state when projectsData changes
    useEffect(() => {
        if (projectsData) {
            setProjects(projectsData);
        }
    }, [projectsData]);

    return { projects, isLoading, isError, error };
}
