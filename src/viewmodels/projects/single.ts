import { useGetFormsQuery } from "@/state/apiSlices/formsApi";

const useFormsViewModel = ({projectId}:{projectId: string | undefined}) => {

    // Fetch projects using the query hook
    // Call the query only if projectId has a valid value
    const { data, isLoading, isError, error } = useGetFormsQuery(projectId!, {
        skip: !projectId,
    });
        
    return { forms: data?.forms, isLoading, isError, error };
}

export default useFormsViewModel