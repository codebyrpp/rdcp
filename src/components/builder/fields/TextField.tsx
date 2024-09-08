"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance } from "../components/FormElements";
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
import { TextFieldValidationInstance, textValidations } from "./validations/text/schemas";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

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
    extraAttributes: typeof extraAttributes & TextFieldValidationInstance;
};

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText } = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Input readOnly disabled placeholder={placeHolder}></Input>
    </div>
    );
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText } = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Input placeholder={placeHolder}></Input>
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
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType) {
        const { label, helperText, required, placeHolder } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
                required,
            },
        });
    }

    const [validationType, setValidationType] = useState<string | undefined>(undefined);

    return (
        <Form {...form}>
            <form onChange={form.handleSubmit(applyChanges)}
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="space-y-3">
                <LabelProperty form={form} />
                <DescriptionProperty form={form} />
                <RequiredProperty form={form} />
                {/* Select Validation */}
                <hr />
                <div className="text-muted-foreground text-sm">Response Validation</div>
                <div className="mt-2 space-y-1">
                    <ResponseValidationProperties
                        validationType={validationType}
                        setValidationType={setValidationType}
                    />
                </div>
            </form>
        </Form>
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

    const [key, setKey] = useState(+new Date());

    return (
        <div key={key} className="flex flex-col gap-4">
            <div className="space-y-3">
                <Label>Validation Type</Label>
                <Select value={validationType}
                    onValueChange={(newValue) => {
                        setValidationType(newValue);
                        setKey(+new Date());
                    }}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Select a Validation Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            Object.entries(textValidations).map(([key, value]) => {
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