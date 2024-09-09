import { FormWithSchema } from "@/models/forms";

const defaultForm = {
    id: '1',
    name: "Form Name",
    elements: [],
};

function useGetFormMutation(): { getForm: (formId: string) => Promise<Partial<FormWithSchema>>; } {
    const getForm = async (formId: string) => {

        if (!formId) {
            return defaultForm;
        }
        
        // get from local storage
        const elements = localStorage.getItem(formId!);

        if (!elements) {
            return defaultForm;
        }
        return {
            id: formId,
            name: "Form Name",
            elements: JSON.parse(elements)
        }

    }

    return { getForm };
}


export { useGetFormMutation };