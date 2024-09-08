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
import { Type } from "lucide-react";

const type: ElementsType = "TextField";

const extraAttributes = {
    label: "Text Field",
    helperText: "Description",
    required: false,
    placeHolder: "Value here...",
};


const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
});

export const TextFieldFormElement: FormElement = {
    type,
    construct: (id:string) => ({
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
    extraAttributes: typeof extraAttributes;
};

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText} = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <Label className="font-semibold">
            {label}
            {required && "*"}
        </Label>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
        <Input readOnly disabled placeholder= {placeHolder}></Input> 
    </div>
    );
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText} = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <Label className="font-semibold">
            {label}
            {required && "*"}
        </Label>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
        <Input placeholder= {placeHolder}></Input>
    </div>
    );
}

type propertiesFormSchemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({
    elementInstance,
}:{
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
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

    function applyChanges(values:  propertiesFormSchemaType) {
        const { label, helperText, required, placeHolder } = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
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
                <FormField
                    control={form.control}
                    name="label"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Label</FormLabel>
                            <FormControl>
                                <Input {...field}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") e.currentTarget.blur(); 
                                }}
                                />
                            </FormControl>
                            <FormDescription>
                                The label of the field. <br/> It will be displayed above the field.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="helperText"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Decription</FormLabel>
                            <FormControl>
                                <Input {...field}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur();
                                    }
                                }}
                                />
                            </FormControl>
                            <FormDescription>
                                The decription of the field. <br/> It will be displayed below the label.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="placeHolder"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>PlaceHolder</FormLabel>
                            <FormControl>
                                <Input {...field}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur();
                                    }
                                }}
                                />
                            </FormControl>
                            <FormDescription>
                                The placeholder of the field.
                            </FormDescription>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="required"
                    render={({ field }) => (
                        <FormItem>
                            <div>
                                <FormLabel>Required</FormLabel>
                                <FormDescription>
                                </FormDescription>
                                </div>
                            <FormControl>
                                <Switch
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

