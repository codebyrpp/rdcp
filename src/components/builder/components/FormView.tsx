import { FormWithSchema } from "@/models/forms"
import { FormElements, SubmitFunction } from "./FormElements";
import { Button } from "@/components/ui/button";
import { useRef } from "react";
import { useToast } from "@/components/ui/use-toast";

export type FormValueType = string | number | string[] | File;
export type FormFieldValuesType = { [key: string]: FormValueType };

type FormViewProps = {
    form: FormWithSchema,
    isPreview?: boolean,
    submitFormHandler?: (formId: string, values: FormFieldValuesType) => void
}

const FormView = ({ form, isPreview = false, submitFormHandler }: FormViewProps) => {

    if (!form) return null;

    const elements = isPreview ? form.draft : form.schema;

    const formValues = useRef<FormFieldValuesType>({});
    const formErrors = useRef<{ [key: string]: boolean }>({});

    const submitValue: SubmitFunction = (key, value, isValid) => {
        if (!isValid) {
            formErrors.current[key] = true;
        }
        else {
            formErrors.current[key] = false
        }
        if(isValid)
            formValues.current[key] = value;
    };

    const { toast } = useToast();

    const submitForm = () => {
        // Check if all the fields are valid
        const isValid = Object.values(formErrors.current).every((error) => !error);

        if (!isValid) {
            toast({
                title: "Please check the form for errors",
                description: "Some fields have errors",
                variant: "destructive"
            });

            return;
        }

        // Call the submitFormHandler if it exists - the form submission happens here
        submitFormHandler?.(form.id!, formValues.current);
    }

    return (
        <div className="flex-1 max-h-full h-full flex-grow w-screen flex justify-center">
            <div className="flex flex-col items-center gap-2 md:w-1/2 px-2
            bg-slate-200 rounded-md  pt-5 
            h-full">
                <div className="bg-white w-full p-4 rounded-md border-t-[6px] border-t-slate-500">
                    <p className="text-xl font-bold">{form.name}</p>
                    <p className="text-sm text-gray-500">{form.description}</p>
                    <p className="text-xs text-red-500 mt-2">* Indicates a required question</p>
                </div>
                {elements?.map((element) => {
                    const FormComponent = FormElements[element.type].formComponent;
                    return (
                        <div key={element.id}
                            className="bg-white w-full p-4 rounded-md focus-within:border-l-4 focus-within:border-l-slate-500">
                            <FormComponent
                                submitValue={submitValue}
                                elementInstance={element} />
                        </div>
                    );
                })}
                <div className="flex mt-2 justify-end md:justify-start w-full">
                    <Button onClick={submitForm}>
                        Submit Form
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormView