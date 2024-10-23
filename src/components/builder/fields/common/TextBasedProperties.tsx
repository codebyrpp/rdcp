import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormElementInstance } from "../../components/FormElements";
import useDesigner from "../../hooks/useDesigner";
import { basePropertiesSchemaType, basePropertiesSchema, baseExtraAttributes } from "../validations/base";
import { FieldProperties } from "../validations/FieldProperties";
import { TextFieldValidationInstance, TextFieldValidation, TextValidations, TextBasedValidations } from "../validations/text/validations";
import useFieldValidation from "../validations/useFieldValidation";

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof baseExtraAttributes & {
        validation?: TextFieldValidationInstance;
    };
};

export default function TextBasedProperties({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;

    const { updateElement } = useDesigner();
    const form = useForm<basePropertiesSchemaType>({
        resolver: zodResolver(basePropertiesSchema),
        mode: "onChange",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
        },
    });

    const {
        validation,
        validationInstance,
        setValidationType,
        updateValidationInstance
    } = useFieldValidation<TextFieldValidationInstance, TextFieldValidation>(element, form, TextValidations);

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);


    function applyChanges(values: basePropertiesSchemaType) {
        const { label, helperText, required } = values;
        updateElement(element.id, {
            id: element.id,
            type: element.type,
            extraAttributes: {
                label,
                helperText,
                required,
                validation: validationInstance
            },
        });
    }

    return (
        <FieldProperties<TextFieldValidationInstance>
            form={form}
            applyChanges={applyChanges}
            validationInstance={validationInstance}
            setValidationType={setValidationType}
            validation={validation}
            updateValidationInstance={updateValidationInstance}
            validations={TextBasedValidations[element.type]}
        />
    );
}