import { ToastAction } from "@/components/ui/toast";
import { useToast } from "@/components/ui/use-toast";
import useProjectNavigation from "@/hooks/useProjectNavigation";
import { useGetFormQuery, useUpdateFormMutation } from "@/state/apiSlices/formsApi";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

export const formSchema = z.object({
    name: z.string().min(1, { message: 'Form Name is required' }),
    description: z.string().optional(),
    isPublic: z.boolean(),
    isPublished: z.boolean(),
    responseMessage: z.string().optional(),
    multipleResponses: z.boolean(),
});


export const useFormSettingsViewModel = (formId: string | undefined) => {

    const { toast } = useToast();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: "",
            description: "",
            isPublic: false,
            isPublished: false,
            responseMessage: "",
            multipleResponses: false
        },
    });

    const { navigateToProject, project } = useProjectNavigation()

    // RTK Query hook to get the form settings
    const { data: formSettings, isLoading: isDataLoading, isSuccess } = useGetFormQuery({ formId: formId ?? '' }, {
        skip: !formId
    });

    const formSettingsRef = useRef(formSettings);

    useEffect(() => {
        if (formSettings) {
            form.reset({
                name: formSettings.name,
                description: formSettings.description,
                isPublic: !formSettings.isPrivate,
                isPublished: formSettings.isPublished,
                responseMessage: formSettings.responseMessage,
                multipleResponses: formSettings.multipleResponses
            })
        }
    }, [formSettingsRef.current !== formSettings])

    // RTK Query hook to update the form
    const [updateFormMutation, { }] = useUpdateFormMutation();

    // Function to handle updating the form
    const handleUpdateForm = async (values: z.infer<typeof formSchema>) => {
        // Call the API to create a project
        try {
            const { isPublic, ...rest } = values;
            const isPrivate = !isPublic;
            const body = {
                ...rest,
                isPrivate
            }

            await updateFormMutation({
                formId: formId!,
                ...body
            }).unwrap();

            toast({
                title: 'Form Updated Successfully',
                duration: 6000,
                variant: 'success',
                action: <ToastAction altText={"Go back to project"} onClick={() => {
                    // Redirect to the form
                    navigateToProject(formSettings?.projectId ?? '', project?.roles!);
                }}>Back to Project</ToastAction>,
            })

        } catch (error) {

            toast({
                title: 'Failed to update form',
                variant: 'destructive',
                description: "An error occurred while updating the form. Please try again.",
                duration: 5000,
            })
        }
    }

    return {
        form,
        handleUpdateForm,
        formSettings,
        isDataLoading,
        isSuccess
    }
}