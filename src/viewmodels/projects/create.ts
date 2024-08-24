import useProjectNavigation from "@/hooks/useProjectNavigation";
import { useCreateProjectMutation } from "@/state/apiSlices/projectsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

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

    const {navigateToProject} = useProjectNavigation();
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
            navigateToProject(project.id);
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