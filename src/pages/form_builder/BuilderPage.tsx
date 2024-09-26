import FormBuilder from "@/components/builder/components/FormBuilder";
import { useGetFormQuery } from "@/state/apiSlices/formsApi";
import { useParams } from "react-router-dom";

export default function BuilderPage() {

    const formId = useParams<{ formId: string }>().formId;

    // RTK Query hook to get the form settings
    const { data: form, isLoading: isDataLoading, isSuccess } = useGetFormQuery({
        formId: formId ?? '',
        schema: true
    }, {
        skip: !formId
    });

    if (isDataLoading) {
        return <div>Loading...</div>
    }

    if (!isSuccess) {
        return <div>Something went wrong</div>
    }

    if (!form) {
        return <div>Form not found</div>
    }

    return <FormBuilder form={form!} />;

}