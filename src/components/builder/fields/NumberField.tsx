"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { RiNumber1 } from "react-icons/ri";
import { NumberFieldValidation, NumberFieldValidationInstance, NumberValidations } from "./validations/number/validations";
import { InputDescription, InputLabel } from "./common/Input";
import useFormValidation from "./validations/useFormValidation";
import { baseExtraAttributes, basePropertiesSchema, basePropertiesSchemaType } from "./validations/base";
import useFieldValidation from "./validations/useFieldValidation";
import { FieldProperties } from "./validations/FieldProperties";

const type: ElementsType = "NumberField";
const PLACEHOLDER = "Number";

export const NumberFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: baseExtraAttributes,
    }),
    designerBtnElement: {
        label: "Number",
        icon: <RiNumber1 className="text-2xl" />
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof baseExtraAttributes & {
        validation?: NumberFieldValidationInstance;
    };
};

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const validation = element.extraAttributes.validation as NumberFieldValidationInstance | undefined;
    const ValidationInfo = validation ? NumberValidations[validation.type].designerComponent : undefined;
    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Input readOnly disabled placeholder={PLACEHOLDER}></Input>
        {validation && ValidationInfo && (
            <ValidationInfo validationInstance={validation}
                validations={NumberValidations} />
        )}
    </div>
    );
}

function FormComponent({
    elementInstance,
    submitValue,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction
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
        mode: "onBlur",
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
    } = useFieldValidation
            <NumberFieldValidationInstance,
                NumberFieldValidation>(element, form, NumberValidations);

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
            },
        });
    }

    return (
        <FieldProperties<NumberFieldValidationInstance>
            form={form}
            applyChanges={applyChanges}
            validationInstance={validationInstance}
            setValidationType={setValidationType}
            validation={validation}
            updateValidationInstance={updateValidationInstance}
            validations={NumberValidations}
        />
    );
}

