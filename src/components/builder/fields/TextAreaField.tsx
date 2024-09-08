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
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { LetterText } from "lucide-react";
import HelperTextProperty from "./common/HelperTextProperty";
import LabelProperty from "./common/LabelProperty";
import RequiredProperty from "./common/RequiredProperty";

const type: ElementsType = "TextAreaField";

const extraAttributes = {
    label: "Text Area Field",
    helperText: "Description",
    required: false,
    placeHolder: "Value here...",
    rows:  3,
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
    rows: z.number().min(1).max(10),
});

export const TextAreaFieldFormElement: FormElement = {
    type,
    construct: (id:string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Text Area Field",
        icon: <LetterText />,
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
        <Label>
            {label}
            {required && "*"}
        </Label>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
        <Textarea readOnly disabled placeholder= {placeHolder}/>    
    </div>
    );
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, placeHolder, helperText, rows} = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full flex-grow">
        <Label className="font-semibold">
            {label}
            {required && "*"}
        </Label>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
        <Textarea placeholder= {placeHolder}  rows={rows}/>
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
            placeHolder: element.extraAttributes.placeHolder,
            rows: element.extraAttributes.rows,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values:  propertiesFormschemaType) {
        const { label, helperText, required, placeHolder, rows } = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                label,
                helperText,
                placeHolder,
                required,
                rows,
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
                <LabelProperty form={form} />
                <HelperTextProperty form={form} />
                <RequiredProperty form={form} />
                <FormField
                    control={form.control}
                    name="rows"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Rows {form.watch("rows")}</FormLabel>
                            <FormControl>
                                <Slider 
                                    defaultValue={[field.value]}
                                    min={1}
                                    max={10}
                                    step={1}
                                    onValueChange={(value) => {
                                        field.onChange(value[0]);
                                    }}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                
            </form>
        </Form>
    );
}

