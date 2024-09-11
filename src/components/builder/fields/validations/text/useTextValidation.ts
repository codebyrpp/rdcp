import { useEffect, useState } from "react";
import { TextFieldValidation, TextFieldValidationInstance, TextFieldValidationType, TextValidations } from "./Validations";
import { FormElementInstance } from "@/components/builder/components/FormElements";
import useDesigner from "@/components/builder/hooks/useDesigner";

const useTextValidation = (element: FormElementInstance, form:any) => {
    const [validationInstance, setValidationInstance] = useState<TextFieldValidationInstance | undefined>(undefined);
    const [validation, setValidation] = useState<TextFieldValidation | undefined>(undefined);
    const { updateElement } = useDesigner();

    useEffect(() => {
        const currentValidationInstance = element.extraAttributes?.validation as TextFieldValidationInstance;
        setValidationInstance(currentValidationInstance);

        if (currentValidationInstance) {
            setValidation(TextValidations[currentValidationInstance.type]);
        } else {
            setValidation(undefined);
        }
    }, [element]);

    function updateValidationInstance(validation: TextFieldValidationInstance | undefined) {
        console.log("Updating Validation Instance...", validation);
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                ...form.getValues(),
                validation,
            }
        });
        setValidationInstance(validation);
    }

    const setValidationType = (validationType: string | undefined) => {
        if (validationType) {
            updateValidationInstance({
                type: validationType as TextFieldValidationType,
                schema: TextValidations[validationType as TextFieldValidationType].schema
            });
            // validation state must be set after the updateValidationInstance
            setValidation(TextValidations[validationType as TextFieldValidationType]);

        } else {
            updateValidationInstance(undefined);
            // validation state must be set after the updateValidationInstance
            setValidation(undefined);
        }
    }
    

    return {
        validationInstance,
        setValidationInstance,
        validation,
        setValidation,
        setValidationType,
        updateValidationInstance
    }
}

export default useTextValidation;