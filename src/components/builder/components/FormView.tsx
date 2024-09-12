import { FormWithSchema } from "@/models/forms"
import { FormElements, SubmitFunction } from "./FormElements";
import { Button } from "@/components/ui/button";
import { useRef } from "react";

const FormView = ({ form }: { form: FormWithSchema }) => {

    if (!form || !form.elements) return null;

    const elements = form.elements;

    const formValues = useRef<{ [key: string]: string | number }>({});

    const submitValue: SubmitFunction = (key: string, value: string | number) => {
        formValues.current[key] = value;
        console.log("Form Values...", formValues.current);
    };

    const submitForm = () => {
        console.log("Submitting form...");
        console.log("Form Values...", formValues.current);
    }

    return (
        <div className="flex-1 max-h-full h-full flex-grow w-screen flex justify-center">
            <div className="flex flex-col items-center gap-2 w-1/2
            bg-slate-200 rounded-md  pt-5 
            h-full">
                <div className="bg-white w-full p-4 rounded-md border-t-[6px] border-t-slate-500">
                    <p className="text-xl font-bold">{form.name}</p>
                    <p className="text-sm text-gray-500">{form.description}</p>
                </div>
                {elements.map((element) => {
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
                <div className="flex mt-2 justify-start w-full">
                    <Button onClick={submitForm}>
                        Submit Form
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default FormView