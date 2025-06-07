import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { updateProjectForms } from "@/redux/slices/projectsSlice"; // Adjust the path as necessary
import { useGetProjectWithFormsQuery } from "@/redux/apiSlices.ts/projectsApi";

export const useProjectWithForms = (projectId: string) => {
  const dispatch = useDispatch();
  const { data: projectWithForms, error, isLoading } = useGetProjectWithFormsQuery({ projectId });

  // Effect to dispatch the forms to the Redux store
  useEffect(() => {
    if (projectWithForms) {
      dispatch(updateProjectForms({ projectId, forms: projectWithForms.forms })); // Update only the forms of the project
    }
  }, [projectWithForms, dispatch, projectId]);

  return {
    projectWithForms,
    error,
    isLoading,
  };
};
