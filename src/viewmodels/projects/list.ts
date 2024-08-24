import { useEffect, useState } from "react"
import { useGetProjectsQuery } from "@/state/apiSlices/projectsApi"

export const useProjectsViewModel = () => {
    // Fetch projects using the query hook
    const { data, isLoading, isError, error } = useGetProjectsQuery();

    return { projects: data, isLoading, isError, error };
}
