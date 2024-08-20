import { useGetProjectQuery } from "@/state/apiSlices/projectsApi";

const useProjectViewModel = ({ projectId, withForms = false }: {
    projectId: string | undefined
    withForms?: boolean,
}) => {

    // Fetch projects using the query hook
    // Call the query only if projectId has a valid value
    const { data, isLoading, isError, error } = useGetProjectQuery({
        projectId: projectId ?? '',
        withForms
    }, {
        skip: !projectId,
    });

    return {
        project: {
            id: data?.id,
            name: data?.name,
            description: data?.description,
            roles: data?.roles
        },
        forms: data?.forms, isLoading, isError, error
    };
}

export default useProjectViewModel