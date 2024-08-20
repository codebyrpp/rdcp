import { useCreateFormMutation } from "@/state/apiSlices/formsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";


const createFormFormSchema = z.object({
    // name is a required string
    name: z.string().min(1, {
        message: "Name is required"
    }).max(255, {
        message: "Name is too long"
    }),
    description: z.string(),
})

export const useCreateFormViewModel = ({
    projectId
}: {
    projectId: string | undefined
}) => {

    const [createFormMutation, { isLoading }] = useCreateFormMutation();

    const form = useForm<z.infer<typeof createFormFormSchema>>({
        resolver: zodResolver(createFormFormSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });

    const handleCreateForm = async (values: z.infer<typeof createFormFormSchema>) => {
        // Call the API to create a project
        try {
            if (projectId) {
                await createFormMutation({
                    projectId,
                    ...values
                }).unwrap();
                form.reset();
            }
            else {
                throw new Error("Project ID is required to create a form");
            }
        } catch (error) {
            console.error("Failed to create project", error);
        }
    }

    return {
        form,
        handleCreateForm,
        isLoading,
    }
}