import FormBuilder from "@/components/builder/components/FormBuilder";
import Loading from "@/components/common/Loading";
import { useGetFormQuery } from "@/state/apiSlices/formsApi";
import { useParams } from "react-router-dom";
import BuilderError from "./BuilderError";
import BuilderLoading from "./BuilderLoading";

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
        return <BuilderLoading />
    }

    if (!isSuccess)
        return <BuilderError error={new Error("Something went wrong!")} />

    if (!form) {
        return <BuilderError error={new Error("Form not found!")} />
    }

    return <FormBuilder form={form!} />;

}