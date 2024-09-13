"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel, FormMessage } from "../../ui/form";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AiOutlineClose, AiOutlinePlus } from "react-icons/ai";
import { ListCheck } from "lucide-react";
import DescriptionProperty from "./common/DescriptionProperty";
import LabelProperty from "./common/LabelProperty";
import RequiredProperty from "./common/RequiredProperty";
import { InputDescription, InputLabel } from "./common/Input";
import ClearableSelect from "@/components/common/ClearableSelect";

const type: ElementsType = "SelectField";

const PLACEHOLDER = "Choose an option...";

const extraAttributes = {
    label: "Select Field",
    helperText: "",
    required: false,
    options: [],
};

const propertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(200),
    required: z.boolean().default(false),
    options: z.array(z.string()).default([]),
});

export const SelectFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Dropdown",
        icon: <ListCheck />
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
    const { label, required, helperText, options } = element.extraAttributes;
    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        <InputDescription description={helperText} />
        <Select disabled={true}>
            <SelectTrigger className="w-full">
                <SelectValue placeholder={PLACEHOLDER} />
            </SelectTrigger>
        </Select>
        <div className="flex flex-wrap items-center gap-2">
            <div className="text-xs">Options: </div>
            {
                options.map((option) => (
                    <div key={option} className="bg-slate-100 rounded-md
                     badge text-xs px-2 py-1">{option}</div>
                ))
            }
        </div>
    </div>
    );
}

function FormComponent({
    elementInstance,
    submitValue
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText, options } = element.extraAttributes;
    const [value, setValue] = useState<string | undefined>(undefined);
    const [key, setKey] = useState(+new Date());

    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        <InputDescription description={helperText} />
        <ClearableSelect
            key={key}
            value={value}
            options={options.map((option) => ({ key: option, label: option }))}
            onValueChange={(newValue) => {
                setValue(newValue)
                if (submitValue) {
                    submitValue(element.id, newValue?.toString() || "");
                }
                setKey(+new Date()); // To force re-render if needed
            }}
            placeholder={PLACEHOLDER}
        />
    </div>
    );
}

type propertiesFormschemaType = z.infer<typeof propertiesSchema>;
function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const form = useForm<propertiesFormschemaType>({
        resolver: zodResolver(propertiesSchema),
        mode: "onChange",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
            options: element.extraAttributes.options,
        },
    });

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values: propertiesFormschemaType) {
        const { label, helperText, required, options } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
                options,
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

                <FormField
                    control={form.control}
                    name="options"
                    render={({ field }) => (
                        <FormItem>
                            <div className="flex justify-between items-center">
                                <FormLabel>Options</FormLabel>
                            </div>
                            <div className="flex flex-col gap-2">
                                {form.watch("options").map((option, index) => (
                                    <div key={index} className="flex items-center justify-between gap-1">

                                        <div className="text-xs p-2">{index + 1}</div>

                                        <Input
                                            required={true}
                                            placeholder={`Option ${index + 1}`}
                                            value={option}
                                            onBlur={(e) => {
                                                if (e.target.value === "") {
                                                    form.setValue("options", field.value.filter((_, i) => i !== index));
                                                }
                                            }}
                                            onChange={(e) => {
                                                field.value[index] = e.target.value;
                                                field.onChange(field.value);
                                            }}
                                        />
                                        <Button
                                            variant={"outline"}
                                            onClick={(e) => {
                                                e.preventDefault();
                                                form.setValue("options", field.value.filter((_, i) => i !== index));
                                                applyChanges(form.getValues());
                                            }}
                                        >
                                            <AiOutlineClose className="h-4" />
                                        </Button>
                                    </div>
                                ))}
                                <Button
                                    variant={"outline"}
                                    className="gap-2"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        form.setValue("options", [...field.value, ""]); {/* Add the correct validation */ }
                                    }}
                                >
                                    <AiOutlinePlus />
                                    Add
                                </Button>
                            </div>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );
}

