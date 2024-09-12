"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Type } from "lucide-react";
import { InputDescription, InputLabel } from "./common/Input";
import { TextFieldValidation, TextFieldValidationInstance, TextValidations } from "./validations/text/Validations";
import useFormValidation from "./validations/useFormValidation";
import { basePropertiesSchemaType, basePropertiesSchema } from "./validations/base";
import { FieldProperties } from "./validations/FieldProperties";
import useFieldValidation from "./validations/useFieldValidation";

const type: ElementsType = "TextField";
const PLACEHOLDER = "Short Answer";

const extraAttributes = {
    label: "Untitled Question",
    helperText: "",
    required: false,
};


export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Short Answer",
        icon: <Type />,
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes & {
        validation?: TextFieldValidationInstance;
    };
};

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const validation = element.extraAttributes.validation as TextFieldValidationInstance | undefined;
    const ValidationInfo = validation ? TextValidations[validation.type].designerComponent : undefined;
    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Input readOnly disabled placeholder={PLACEHOLDER}></Input>
        {validation && ValidationInfo && (
            <ValidationInfo validationInstance={validation} />
        )}
    </div>
    );
}

function FormComponent({
    elementInstance,
    submitValue,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const { errors, validateField } = useFormValidation(element.extraAttributes.validation?.schema);
    const [value, setValue] = useState("");

    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Input
            placeholder={PLACEHOLDER}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
                if (!submitValue) return;
                const isValid = validateField(e.target.value);
                if (isValid) {
                    submitValue(element.id, e.target.value);
                }
            }} />
        {errors && (
            <div className="text-red-500 text-xs">
                {errors.map((error, index) => (
                    <div key={index}>{error.message}</div>
                ))}
            </div>
        )}
    </div>
    );
}


function PropertiesComponent({
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
            validations={TextValidations}
        />
    );
}

