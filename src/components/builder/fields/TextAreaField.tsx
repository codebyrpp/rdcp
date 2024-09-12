"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Label } from "../../ui/label";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { LetterText } from "lucide-react";
import { InputDescription, InputLabel } from "./common/Input";
import { TextAreaValidations, TextFieldValidation, TextFieldValidationInstance, TextValidations } from "./validations/text/validations";
import useFormValidation from "./validations/useFormValidation";
import { FieldProperties } from "./validations/FieldProperties";
import useFieldValidation from "./validations/useFieldValidation";
import { basePropertiesSchema, basePropertiesSchemaType } from "./validations/base";

const type: ElementsType = "TextAreaField";
const PLACEHOLDER = "Long answer text";

const extraAttributes = {
    label: "Untitled Question",
    helperText: "",
    required: false,
};

export const TextAreaFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Paragraph",
        icon: <LetterText />,
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
    const { label, required, helperText, validation } = element.extraAttributes;
    const ValidationInfo = validation ? TextValidations[validation.type].designerComponent : undefined;
    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Textarea readOnly disabled placeholder={PLACEHOLDER} />
        {validation && ValidationInfo && (
            <ValidationInfo
                validations={TextAreaValidations}
                validationInstance={validation} />
        )}
    </div>
    );
}

function FormComponent({
    elementInstance,
    submitValue
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const [value, setValue] = useState("");
    const { errors, validateField } = useFormValidation(element.extraAttributes.validation?.schema);

    return (<div className="flex flex-col gap-2 w-full flex-grow">
        <Label className="font-semibold">
            {label}
            {required && "*"}
        </Label>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
        <Textarea placeholder={PLACEHOLDER}
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
            ...element,
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

