"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance } from "../../components/FormElements";
import { Input } from "../../../ui/input";
import { Label } from "../../../ui/label";
import { useEffect } from "react";
import useDesigner from "../../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../../../ui/form";
import { Heading2 } from "lucide-react";

const type: ElementsType = "SubTitleField";

const extraAttributes = {
    title: " SubTitle Field",
};

const propertiesSchema = z.object({
    title: z.string().min(2).max(50),
});

export const SubTitleFieldFormElement: FormElement = {
    type,
    construct: (id:string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "SubTitle Field",
        icon: <Heading2/>
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
    const { title} = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <Label className="text-muted-foreground">
            SubTitle Field
        </Label>
        <p className="text-lg font-bold">{title}</p>
    </div>
    );
}

function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;

    const { title } = element.extraAttributes;
    return <p className="font-bold">{title}</p>;
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
            title: element.extraAttributes.title,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values:  propertiesFormschemaType) {
        const { title } = values;
        updateElement(element.id,{
            ...element,
            extraAttributes: {
                title,
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
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>SubTitle</FormLabel>
                            <FormControl>
                                <Input {...field}
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

