import { useEffect, useState } from "react";
import { BaseFieldValidation, BaseValidationInstance } from "./base";
import { FormElementInstance } from "@/components/builder/components/FormElements";
import useDesigner from "@/components/builder/hooks/useDesigner";

// Define a generic hook for any validation type
const useFieldValidation = <TValidationInstance extends BaseValidationInstance, TFieldValidation extends BaseFieldValidation<TValidationInstance>>(
    element: FormElementInstance,
    form: any,
    availableValidations: Record<string, TFieldValidation>
) => {
    const [validationInstance, setValidationInstance] = useState<TValidationInstance | undefined>(undefined);
    const [validation, setValidation] = useState<TFieldValidation | undefined>(undefined);
    const { updateElement } = useDesigner();

    // Effect to initialize validation state from element extraAttributes
    useEffect(() => {
        const currentValidationInstance = element.extraAttributes?.validation as TValidationInstance;
        setValidationInstance(currentValidationInstance);

        if (currentValidationInstance) {
            setValidation(availableValidations[currentValidationInstance.type]);
        } else {
            setValidation(undefined);
        }
    }, [element, availableValidations]);

    // Function to update validation instance and element attributes
    function updateValidationInstance(newValidation: TValidationInstance | undefined) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                ...form.getValues(),
                validation: newValidation,
            }
        });
        setValidationInstance(newValidation);
    }

    // Function to update the validation type
    const setValidationType = (validationType: string | undefined) => {
        if (validationType) {
            const newValidationInstance = {
                type: validationType as TValidationInstance['type'],
                schema: availableValidations[validationType].schema,
            } as TValidationInstance;

            updateValidationInstance(newValidationInstance);
            setValidation(availableValidations[validationType]);

        } else {
            updateValidationInstance(undefined);
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

export default useFieldValidation;
