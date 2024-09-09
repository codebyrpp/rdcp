"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { Type } from "lucide-react";
import LabelProperty from "./common/LabelProperty";
import DescriptionProperty from "./common/DescriptionProperty";
import RequiredProperty from "./common/RequiredProperty";
import { InputDescription, InputLabel } from "./common/Input";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { TextFieldValidation, TextFieldValidationInstance, TextFieldValidationType, TextValidations } from "./validations/text/Validations";
import { InfoCircledIcon } from "@radix-ui/react-icons";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text Field",
    helperText: "",
    required: false,
    placeHolder: "Short Answer",
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(1500),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
});

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Text Field",
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
    const { label, required, placeHolder, helperText } = element.extraAttributes;
    const validation = element.extraAttributes.validation as TextFieldValidationInstance | undefined;

    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Input readOnly disabled placeholder={placeHolder}></Input>
        {validation && (
            <div className="text-muted-foreground text-xs flex items-center">
                <InfoCircledIcon className="w-4 h-4 inline-block mr-1" />
                <span>
                    {TextValidations[validation.type].name} Validation Applied
                </span>
            </div>
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
    const { label, required, placeHolder, helperText } = element.extraAttributes;

    const [value, setValue] = useState("");

    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Input
            placeholder={placeHolder}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
                if (!submitValue) return;
                submitValue(element.id, e.target.value);
            }} />

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
    const validationInstance = element.extraAttributes.validation as TextFieldValidationInstance | undefined;
    const { updateElement } = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onChange",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            placeHolder: element.extraAttributes.placeHolder,
        },
    });

    useEffect(() => {
        console.log("Resetting Form...", element.extraAttributes);
        form.reset(element.extraAttributes);
    }, [element, form]);


    function applyChanges(values: propertiesFormSchemaType) {
        const { label, helperText, required, placeHolder } = values;
        console.log("Applying Changes...", values);
        updateElement(element.id, {
            id: element.id,
            type: element.type,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
                required,
                validation: element.extraAttributes.validation
            },
        });
    }


    function updateValidationInstance(validation: TextFieldValidationInstance | undefined) {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                ...form.getValues(),
                validation,
            }
        });
    }

    const [validation, setValidation] = useState<TextFieldValidation | undefined>(undefined);

    const setValidationType = (validationType: string | undefined) => {
        if (validationType) {
            setValidation(TextValidations[validationType as TextFieldValidationType]);
            updateValidationInstance({
                type: validationType as TextFieldValidationType,
                schema: validationInstance?.schema
            });
        } else {
            setValidation(undefined);
            updateValidationInstance(undefined);
        }
    }


    return (
        <div className="flex flex-col gap-4">
            <Form {...form}>
                <form onChange={form.handleSubmit(applyChanges)}
                    onSubmit={(e) => { e.preventDefault(); }}
                    className="space-y-3">
                    <LabelProperty form={form} />
                    <DescriptionProperty form={form} />
                    <RequiredProperty form={form} />
                </form>
            </Form>
            <hr />
            <div className="text-muted-foreground text-sm">Response Validation</div>
            <ResponseValidationProperties
                validationType={validationInstance?.type}
                setValidationType={setValidationType}
            />
            {/* {validation && (
                <validation.propertiesComponent
                    validationInstance={{
                        ...validation
                    }}
                    update={updateValidationInstance}
                />
            )} */}
        </div>
    );
}


const ResponseValidationProperties = (
    {
        validationType,
        setValidationType
    }: {
        validationType: string | undefined,
        setValidationType: (value: string | undefined) => void
    }
) => {
    const [value, setValue] = useState<string | undefined>(validationType);
    const [key, setKey] = useState(+new Date());

    return (
        <div key={key} className="flex flex-col gap-4">
            <div className="space-y-3">
                <Label>Validation Type</Label>
                <Select value={value}
                    onValueChange={(newValue) => {
                        setValue(newValue.toString());
                        setValidationType(newValue.toString());
                        setKey(+new Date());
                    }}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Select a Validation Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            Object.entries(TextValidations).map(([key, value]) => {
                                return (
                                    <SelectItem key={key} value={key}>
                                        {value.name}
                                    </SelectItem>
                                );
                            })
                        }
                        <SelectSeparator />
                        <Button
                            className="w-full px-2"
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation()
                                setValue(undefined)
                                setValidationType(undefined)
                            }}
                        >
                            Clear
                        </Button>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}