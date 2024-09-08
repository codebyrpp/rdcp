"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance } from "../components/FormElements";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import LabelProperty from "./common/LabelProperty";
import DescriptionProperty from "./common/DescriptionProperty";
import RequiredProperty from "./common/RequiredProperty";
import { InputLabel, InputDescription } from "./common/Input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";


const type: ElementsType = "DateField";

const extraAttributes = {
    label: "Date Field",
    helperText: "",
    required: false,
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(1500),
    required: z.boolean().default(false),
});

export const DateFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Date",
        icon: <CalendarIcon />
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
    const { label, required, helperText } = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Button
            variant={"outline"}
            className="w-full justify-start text-left font-normal">
            <CalendarIcon className="mr-2 h-4 w-4" />
            <span>Pick a date</span>
        </Button>
    </div>
    );
}
//have to add the validation to the date field/ calendar
function FormComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const [date, setDate] = useState<Date|undefined>(undefined);

    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn("w-full justify-start text-left font-normal",
                        date ? "text-primary" : "text-muted-foreground",
                    )}>
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    <span>{date?.toLocaleDateString() ?? "Pick a date"}</span>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={setDate}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
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
            },
        });
    }

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
            </form>
        </Form>
    );
}

