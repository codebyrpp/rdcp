"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form, FormField, FormItem, FormLabel } from "../../ui/form";
import { Select, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { AiOutlinePlus } from "react-icons/ai";
import { ListCheck } from "lucide-react";
import DescriptionProperty from "./common/DescriptionProperty";
import LabelProperty from "./common/LabelProperty";
import RequiredProperty from "./common/RequiredProperty";
import { InputDescription, InputLabel } from "./common/Input";
import ClearableSelect from "@/components/common/ClearableSelect";
import DraggableList from "./common/DraggableList";
import useFormValidation from "./validations/useFormValidation";
import { FieldErrors } from "./FieldErrors";

const type: ElementsType = "SelectField";

const PLACEHOLDER = "Choose an option...";

const extraAttributes = {
    label: "Untitled Question",
    helperText: "",
    required: false,
    options: [],
};

export const selectExtraAttributes = extraAttributes;

export const selectPropertiesSchema = z.object({
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
    propertiesComponent: SelectPropertiesComponent,

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
    const { errors, requiredValidation } = useFormValidation(required);

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
                    const isNotValid = requiredValidation(newValue?.toString() ?? "");
                    submitValue(element.id, newValue?.toString() ?? "", !isNotValid);
                }
                setKey(+new Date()); // To force re-render if needed
            }}
            placeholder={PLACEHOLDER}
        />
        {errors && (<FieldErrors errors={errors} />)}
    </div>
    );
}

type propertiesFormschemaType = z.infer<typeof selectPropertiesSchema>;

export function SelectPropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const form = useForm<propertiesFormschemaType>({
        resolver: zodResolver(selectPropertiesSchema),
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
                            <DraggableList
                                items={form.watch("options")}
                                onUpdate={(newItems) => {
                                    form.setValue("options", newItems);
                                    applyChanges(form.getValues());
                                }}
                                onRemove={(index) => {
                                    form.setValue("options", field.value.filter((_, i) => i !== index));
                                    applyChanges(form.getValues());
                                }}
                                onChangeItem={(index, newValue) => {
                                    field.value[index] = newValue;
                                    field.onChange(field.value);
                                }}
                            />
                            <Button
                                variant={"outline"}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handleAddOption(e, field, form);
                                }}
                            >
                                <AiOutlinePlus className="h-4 mr-2" />
                                Add Option
                            </Button>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    );

    function handleAddOption(e: any, field: any, form: any) {
        // filter the options to remove empty strings
        const options = form.getValues().options.filter((option: string) => option.trim() !== "");
        if (options.length !== 0) {
            form.setValue("options", options);
        }
        applyChanges(form.getValues());
        form.setValue("options", [...field.value, ""]);
    }
}

