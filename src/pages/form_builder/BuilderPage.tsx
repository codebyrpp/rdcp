import FormBuilder from "@/components/builder/components/FormBuilder";
import { FormWithSchema } from "@/models/forms";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function BuilderPage() {

    const formId = useParams<{ formId: string }>().formId;
    const [form, setForm] = useState<Partial<FormWithSchema>>();

    useEffect(() => {
        console.log("Form ID: ", formId);
        // TODO: fetch form data from database
        
        if (!formId) {
            setForm({
                id: '1',
                name: "Form Name",
                elements: [],
            });
            return;
        }
        // get from local storage
        const localform = localStorage.getItem(formId!);
        if (localform) {
            setForm(JSON.parse(localform));
            return;
        }

    }, [formId]);

    if (!form){
        return <h1>Form not found</h1>
    }

    return <FormBuilder form={form} />;

}