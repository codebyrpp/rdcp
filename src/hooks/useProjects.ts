import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { Project } from "@/models/project";
import { useGetProjectsQuery } from "@/redux/apiSlices.ts/projectsApi";
import { setProjects } from "@/redux/slices/projectsSlice";

export const useProjects = () => {
  const dispatch = useDispatch();

  // Fetch projects using RTK Query
  const { data: fetchedProjects, error, isLoading } = useGetProjectsQuery();

  // Access the projects from the Redux state
  const projects = useSelector((state: RootState) => state.projects.projects);

  // Effect to save fetched projects in the Redux state
  useEffect(() => {
    if (fetchedProjects) {
      dispatch(setProjects(fetchedProjects));
    }
  }, [fetchedProjects, dispatch]);

  return {
    projects,
    error,
    isLoading,
  };
};
