"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance } from "../components/FormElements";
import { Label } from "../../ui/label";
import { useEffect } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { Calendar, CalendarIcon } from "lucide-react";
import { Popover, PopoverContent } from "@/components/ui/popover";
import { PopoverTrigger } from "@radix-ui/react-popover";
import LabelProperty from "./common/LabelProperty";
import DescriptionProperty from "./common/DescriptionProperty";
import RequiredProperty from "./common/RequiredProperty";


const type: ElementsType = "DateField";

const extraAttributes = {
    label: "Date Field",
    helperText: "Pick a date",
    required: false,
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    placeHolder: z.string().max(50),
});

export const DateFieldFormElement: FormElement = {
    type,
    construct: (id:string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Date Field",
        icon: <CalendarIcon/>
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
    const { label, required,  helperText} = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <Label className="font-semibold">
            {label}
            {required && "*"}
        </Label>
        <Button
            variant={"outline"}
            className="w-full justify-start text-left font-normal">
                <CalendarIcon className="mr-2 h-4 w-4"/>
                <span>Pick a date</span>
            </Button>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
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
    const { label, required, helperText} = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <Label className="font-semibold">
            {label}
            {required && "*"}
        </Label>
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className="w-full justify-start text-left font-normal">
                        <CalendarIcon className="mr-2 h-4 w-4"/>
                        <span>Pick a date</span>
                    </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"/>
            </PopoverContent>
        </Popover>
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
                <LabelProperty form={form} />
                <DescriptionProperty form={form} />
                <RequiredProperty form={form}/>
            </form>
        </Form>
    );
}

