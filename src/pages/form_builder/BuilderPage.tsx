import FormBuilder from "@/components/builder/components/FormBuilder";
import { FormWithSchema } from "@/models/forms";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const defaultForm = {
    id: '1',
    name: "Form Name",
    elements: [],
};

export default function BuilderPage() {

    const formId = useParams<{ formId: string }>().formId;
    const [form, setForm] = useState<Partial<FormWithSchema>>();

    useEffect(() => {
        console.log("Form ID: ", formId);
        // TODO: fetch form data from database
        
        if (!formId) {
            setForm(defaultForm);
            return;
        }
        // get from local storage
        const elements = localStorage.getItem(formId!);
        
        if (!elements) {
            setForm(defaultForm);
            return;
        }

        setForm({
            id: formId,
            name: "Form Name",
            elements: JSON.parse(elements)
        });

    }, [formId]);

    if (!form){
        return <h1>Form not found</h1>
    }

    return <FormBuilder form={form} />;

}