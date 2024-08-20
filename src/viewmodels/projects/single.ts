import { useGetProjectWithFormsQuery } from "@/state/apiSlices/projectsApi";

const useProjectViewModel = ({ projectId }: {
    projectId: string | undefined
}) => {

    // Fetch projects using the query hook
    // Call the query only if projectId has a valid value
    const { data, isLoading, isError, error } = useGetProjectWithFormsQuery({
        projectId: projectId ?? '',}, {
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