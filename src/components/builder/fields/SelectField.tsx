"use client";

import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { useCallback, useEffect, useState } from "react";
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
import { SelectOptions } from "./common/SelectOptions";

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
});

export const SelectFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: { ...extraAttributes, options: [...extraAttributes.options] }, // Deep copy options
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
                options.map((option, index) => (
                    <div key={index} className="bg-slate-100 rounded-md
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

type propertiesFormSchemaType = z.infer<typeof selectPropertiesSchema>;

export function SelectPropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const form = useForm<propertiesFormSchemaType>({
        resolver: zodResolver(selectPropertiesSchema),
        mode: "onChange",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
        },
    });

    useEffect(() => {
        form.reset({
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
        });
    }, [element, form]);

    function applyChanges(values: propertiesFormSchemaType) {
        const { label, helperText, required } = values;
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                label,
                helperText,
                required,
                options: element.extraAttributes.options,
            },
        });
    }


    // Function to handle updates to the options
    const updateSelectOptions = useCallback((newOptions: string[]) => {
        updateElement(element.id, {
            ...element,
            extraAttributes: {
                ...element.extraAttributes,
                options: [...newOptions],
            },
        });
    }, [element]);

    return (
        <>
            <Form {...form}>
                <form onChange={form.handleSubmit(applyChanges)}
                    onSubmit={(e) => { e.preventDefault(); }}
                    className="space-y-3">
                    <LabelProperty form={form} />
                    <DescriptionProperty form={form} />
                    <RequiredProperty form={form} />
                </form>
            </Form>
            <SelectOptions
                key={element.id}
                elementId={element.id}
                options={element.extraAttributes.options} updateOptions={updateSelectOptions} />
        </>
    );
}

