"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance } from "../components/FormElements";
import { Label } from "../../ui/label";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Textarea } from "@/components/ui/textarea";
import { AlignJustify } from "lucide-react";

const type: ElementsType = "ParagraphField";

const extraAttributes = {
    text: "Text here",
};

const propertiesSchema = z.object({
    text: z.string().min(2).max(500),
});

export const ParagraphFieldFormElement: FormElement = {
    type,
    construct: (id:string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Paragraph Field",
        icon: <AlignJustify />
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
    const { text } = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <Label className="text-muted-foreground">
            Paragraph Field
        </Label>
        <p className="text-sm">{text}</p>
    </div>
    );
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;

    const { text } = element.extraAttributes;
    return <p className="text-sm">{text}</p>;
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
            text: element.extraAttributes.text,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values:  propertiesFormschemaType) {
        const { text } = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                text,
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
                    name="text"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Text</FormLabel>
                            <FormControl>
                                <Textarea 
                                rows = {5}
                                {...field}
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        e.currentTarget.blur();
                                    }
                                }}
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

