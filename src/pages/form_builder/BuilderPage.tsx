import FormBuilder from "@/components/builder/components/FormBuilder";
import { useGetFormMutation } from "@/state/formMockApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



export default function BuilderPage() {

    const formId = useParams<{ formId: string }>().formId;
    const { getForm } = useGetFormMutation();

    const [form, setForm] = useState<any>();

    useEffect(() => {
        if(formId){
            getForm(formId).then((data: any) => {
                setForm(data)
            })
        }
        
    }, [formId])

    if (!form) {
        return <div>Loading...</div>
    }

    return <FormBuilder form={form} />;

}