import { useEffect, useState } from "react"
import { useCreateProjectMutation, useGetProjectsQuery } from "@/state/apiSlices/projectsApi"
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import useProject from "@/hooks/useProject";
import { error } from "console";

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


const projectFormSchema = z.object({
    // name is a required string
    name: z.string().min(1, {
        message: "Name is required"
    }).max(255, {
        message: "Name is too long"
    }),
    description: z.string(),
})

export const useCreateProjectViewModel = () => {

    const {navigateToProject} = useProject();
    const [createProjectMutation, {isLoading}] = useCreateProjectMutation();

    const form = useForm<z.infer<typeof projectFormSchema>>({
        resolver: zodResolver(projectFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const handleCreateProject = async (values: z.infer<typeof projectFormSchema>) => {
        // Call the API to create a project
        try {
            const project = await createProjectMutation(values).unwrap();
            navigateToProject(project._id);
        } catch (error) {
            console.error("Failed to create project", error);
        }
    }

    return {
        form,
        handleCreateProject,
        isLoading,
    }
}