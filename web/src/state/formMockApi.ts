import { FormWithSchema } from "@/models/forms";

function useGetFormMutation(): { getForm: (formId: string) => Promise<FormWithSchema>; } {
    const getForm = async (formId: string) => {
        console.log('getForm', formId)

        if (!formId) {
            throw new Error("Form ID is required");
        }

        // get from local storage
        let _elements = localStorage.getItem(formId!);
        const elements = _elements ? JSON.parse(_elements) : [];

        return {
            id: formId,
            name: "Form Name",
            description: "Form Description",
            elements: elements
        }

    }

    return { getForm };
}


export { useGetFormMutation };