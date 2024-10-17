import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useProjectNavigation from "@/hooks/useProjectNavigation";
import { useGetProjectQuery, useGetProjectWithFormsQuery, useUpdateProjectMutation } from "@/state/apiSlices/projectsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";


const useProjectViewModel = ({ projectId }: {
    projectId: string | undefined
}) => {

    // Fetch projects using the query hook
    // Call the query only if projectId has a valid value
    const { data, isLoading, isError, error } = useGetProjectWithFormsQuery({
        projectId: projectId ?? '',
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


const projectSchema = z.object({
    // name is a required string
    name: z.string().min(1, {
        message: "Name is required"
    }).max(255, {
        message: "Description is too long"
    }),
    description: z.string(),
})


export const useProjectInfoViewModel = ({ projectId }: {
    projectId: string | undefined
}) => {

    // Fetch projects using the query hook
    // Call the query only if projectId has a valid value
    const { data: project, isLoading, isError, error } = useGetProjectQuery(
        projectId ?? '', {
        skip: !projectId,
    });

    const [updateProject, { }] = useUpdateProjectMutation();

    const projectForm = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });


    const projectRef = useRef(project);

    useEffect(() => {
        if (project) {
            projectForm.reset({
                name: project.name,
                description: project.description,
            });
        }
    }, [projectRef.current !== project]);

    const { toast } = useToast();
    const { navigateToProject } = useProjectNavigation();

    const handleProjectUpdate = async (values: z.infer<typeof projectSchema>) => {
        // Call the API to update the project
        try {

            await updateProject({
                id: projectId!,
                name: values.name,
                description: values.description,
            }).unwrap();

            toast({
                title: "Project Updated",
                description: "Project settings have been updated successfully.",
                duration: 5000,
                variant: 'success',
                action: <ToastAction altText={"Go back to project"} onClick={() => {
                    // Redirect to the form
                    navigateToProject(project!);
                }}>Back to Project</ToastAction>
            });

        } catch (e) {
            toast({
                title: "Project Update Failed",
                description: "An error occurred while updating the project.",
                duration: 5000,
                variant: "destructive",
            });
        }
    }

    return {
        project,
        projectForm,
        handleProjectUpdate,
        isLoading, isError, error
    };
}

export default useProjectViewModel