"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance } from "../components/FormElements";
import { Input } from "../../ui/input";
import { Label } from "../../ui/label";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Switch } from "../../ui/switch";
import { Checkbox } from "@radix-ui/react-checkbox";
import { CheckCheck } from "lucide-react";
import LabelProperty from "./common/LabelProperty";
import HelperTextProperty from "./common/HelperTextProperty";
import RequiredProperty from "./common/RequiredProperty";

const type: ElementsType = "CheckboxField";

const extraAttributes = {
    label: "Checkbox Field",
    helperText: "Description",
    required: false,
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
});

export const CheckboxFieldFormElement: FormElement = {
    type,
    construct: (id:string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Checkbox Field",
        icon: <CheckCheck/>
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,

};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText} = element.extraAttributes;
    const id = `checkbox-${element.id}`;
    return (<div className="flex items-top space-x-2">
        <Checkbox id={id} defaultChecked={required} />
        <div className="grid gap-1.5 leading-none">
            <Label htmlFor={id}>
                {label}
                {required && "*"}
            </Label>
        </div>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
    </div>
    );
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText} = element.extraAttributes;
    const id = `checkbox-${element.id}`;
    return (<div className="flex items-top space-x-2">
        <Checkbox id={id} defaultChecked={required} />
        <div className="grid gap-1.5 leading-none">
            <Label htmlFor={id}>
                {label}
                {required && "*"}
            </Label>
        </div>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
    </div>
    );
}

type propertiesFormschemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({
    elementInstance,
}:{
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const form = useForm<propertiesFormschemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values:  propertiesFormschemaType) {
        const { label, helperText, required} = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
            },
        });
    }

    return(
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)} 
                onSubmit={(e) => {
                    e.preventDefault();
                }}
                className="space-y-3">
                <LabelProperty form={form}/>
                <HelperTextProperty form={form}/>
                <RequiredProperty form={form}/>
            </form>
        </Form>
    );
}

