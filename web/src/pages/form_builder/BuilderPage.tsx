import FormBuilder from "@/components/builder/components/FormBuilder";
import { useGetFormQuery } from "@/state/apiSlices/formsApi";
import BuilderError from "./BuilderError";
import BuilderLoading from "./BuilderLoading";
import useProjectNavigation from "@/hooks/useProjectNavigation";

export default function BuilderPage() {

    const { form: _form } = useProjectNavigation();
    const { id: formId } = _form!;

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