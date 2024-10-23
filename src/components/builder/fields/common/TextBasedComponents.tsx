import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FormElementInstance } from "../../components/FormElements";
import useDesigner from "../../hooks/useDesigner";
import { basePropertiesSchemaType, basePropertiesSchema, baseExtraAttributes } from "../validations/base";
import { FieldProperties } from "../validations/FieldProperties";
import { TextFieldValidationInstance, TextFieldValidation, TextValidations, TextBasedValidations } from "../validations/text/validations";
import useFieldValidation from "../validations/useFieldValidation";
import { Input } from "@/components/ui/input";
import { InputLabel, InputDescription } from "./Input";
import { QuestionPlaceholder } from "../placeholders";

export type TextBasedInstance = FormElementInstance & {
    extraAttributes: typeof baseExtraAttributes & {
        validation?: TextFieldValidationInstance;
    };
};

export function TextBasedProperties({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as TextBasedInstance;

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


export function TextBasedDesignerComponent({
    elementInstance,
    textBasedInput
}: {
    elementInstance: FormElementInstance;
    textBasedInput: React.FC<any>;
}) {
    const element = elementInstance as TextBasedInstance;
    const { label, required, helperText } = element.extraAttributes;
    const validation = element.extraAttributes.validation as TextFieldValidationInstance | undefined;
    const ValidationInfo = validation ? TextValidations[validation.type].designerComponent : undefined;
    const TextBasedInput = textBasedInput;
    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <TextBasedInput readOnly disabled placeholder={QuestionPlaceholder[element.type]}/>
        {validation && ValidationInfo && (
            <ValidationInfo
                validations={TextValidations}
                validationInstance={validation} />
        )}
    </div>
    );
}