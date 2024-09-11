import { useEffect, useState } from "react";
import { TextFieldValidation, TextFieldValidationInstance, TextValidations } from "./Validations";
import { FormElementInstance } from "@/components/builder/components/FormElements";

const useTextValidation = (element: FormElementInstance) => {
    const [validationInstance, setValidationInstance] = useState<TextFieldValidationInstance | undefined>(undefined);
    const [validation, setValidation] = useState<TextFieldValidation | undefined>(undefined);

    useEffect(() => {
        const currentValidationInstance = element.extraAttributes?.validation as TextFieldValidationInstance;
        setValidationInstance(currentValidationInstance);

        if (currentValidationInstance) {
            setValidation(TextValidations[currentValidationInstance.type]);
        } else {
            setValidation(undefined);
        }
    }, [element]);
    

    return {
        validationInstance,
        setValidationInstance,
        validation,
        setValidation
    }
}

export default useTextValidation;