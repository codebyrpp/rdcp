import { FormWithSchema } from "@/models/forms"
import { FormElements, SubmitFunction } from "./FormElements";
import { Button } from "@/components/ui/button";
import { useCallback, useRef, useState } from "react";
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
    // formErrors is used to store the error state of each field, initially all fields are invalid
    const formErrors = useRef<{ [key: string]: boolean }>({});

    const submitValue: SubmitFunction = (key, value, isValid) => {
        if (!isValid) {
            formErrors.current[key] = true;
        }
        else {
            formErrors.current[key] = false
        }
        formValues.current[key] = value;
    };

    const { toast } = useToast();

    const doRequiredValidation = useCallback(() => {
        // Check if the element is required and set the formErrors state accordingly
        let hasRequiredFields = false;
        elements?.forEach((element) => {
            if (element.extraAttributes?.required && !formValues.current[element.id]) {
                formErrors.current[element.id] = true;
                hasRequiredFields = true;
            }
        });
        return hasRequiredFields;
    }, []);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const submitForm = () => {
        // Check if each and every field in the elements is valid
        setIsSubmitting(true);
        const hasRequiredField =  doRequiredValidation();

        const isValid = elements?.every((element) => {
            return !formErrors.current[element.id];
        });

        if (!isValid) {
            toast({
                title: hasRequiredField ? "Please fill all required fields" : "Please fill all fields correctly",
                variant: "destructive",
                duration: 4000
            });
            setIsSubmitting(false);
            return;
        }

        // Call the submitFormHandler if it exists - the form submission happens here
        submitFormHandler?.(form.id!, formValues.current);
        setIsSubmitting(false);
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
                    <Button onClick={submitForm} disabled={isSubmitting}>
                        {isSubmitting ? "Submitting..." : "Submit"}
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormView