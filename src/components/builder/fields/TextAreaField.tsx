"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance } from "../components/FormElements";
import { Label } from "../../ui/label";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { LetterText } from "lucide-react";
import DescriptionProperty from "./common/DescriptionProperty";
import LabelProperty from "./common/LabelProperty";
import RequiredProperty from "./common/RequiredProperty";
import { InputDescription, InputLabel } from "./common/Input";
import { TextFieldValidation, TextFieldValidationInstance, TextValidations } from "./validations/text/Validations";
import { ErrorObject } from "ajv";

const type: ElementsType = "TextAreaField";
const PLACEHOLDER = "Long answer text";

const extraAttributes = {
    label: "Untitled Question",
    helperText: "",
    required: false,
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
});

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
            <ValidationInfo validationInstance={validation} />
        )}
    </div>
    );
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const [errors, setErrors] = useState<ErrorObject[] | null>([]);
    const [value, setValue] = useState("");

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
                //TODO: Implement validation
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

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;

function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const [validationInstance, setValidationInstance] = useState<TextFieldValidationInstance | undefined>(undefined);
    const [validation, setValidation] = useState<TextFieldValidation | undefined>(undefined);

    useEffect(() => {
        const currentValidationInstance = element.extraAttributes.validation;
        setValidationInstance(currentValidationInstance);

        if (currentValidationInstance) {
            setValidation(TextValidations[currentValidationInstance.type]);
        } else {
            setValidation(undefined);
        }
    }, [element]);
    
    const { updateElement } = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onChange",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType) {
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
        <Form {...form}>
            <form onChange={form.handleSubmit(applyChanges)}
                onSubmit={(e) => { e.preventDefault(); }}
                className="space-y-3">
                <LabelProperty form={form} />
                <DescriptionProperty form={form} />
                <RequiredProperty form={form} />
            </form>
        </Form>
    );
}

