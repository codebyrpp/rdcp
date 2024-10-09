import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { Form } from "../../ui/form";
import { Button } from "@/components/ui/button";
import { CalendarIcon, X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import LabelProperty from "./common/LabelProperty";
import DescriptionProperty from "./common/DescriptionProperty";
import RequiredProperty from "./common/RequiredProperty";
import { InputLabel, InputDescription } from "./common/Input";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { baseExtraAttributes, basePropertiesSchema, basePropertiesSchemaType } from "./validations/base";

const type: ElementsType = "DateField";

export const DateFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: baseExtraAttributes,
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
    extraAttributes: typeof baseExtraAttributes;
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

function FormComponent({
    elementInstance,
    submitValue
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const [date, setDate] = useState<Date | undefined>(undefined);
    const [errors, setErrors] = useState<string | undefined>(undefined)

    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Popover>
            <PopoverTrigger asChild>
                <div>
                    <div className="flex gap-1">
                        <Button
                            variant={"outline"}
                            className={cn("w-full justify-start text-left font-normal",
                                date ? "text-primary" : "text-muted-foreground",
                            )}>
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            <span>{date?.toLocaleDateString() ?? "Pick a date"}</span>
                        </Button>
                        {/* Clear */}
                        {
                            date && <Button
                                variant={"icon"}
                                className=""
                                onClick={() => {
                                    setDate(undefined);
                                    if (submitValue) {
                                        submitValue(element.id, "", required ? false : true);
                                    }
                                }}>
                                <X className="w-4"/>
                            </Button>
                        }
                    </div>
                    {
                        errors && <p className="text-destructive">
                            {errors}
                        </p>
                    }
                </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(date) => {
                        setErrors(undefined);
                        setDate(date);
                        if (submitValue && date) {
                            submitValue(element.id, date.toISOString(), true);
                        }
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    </div>
    );
}

function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { updateElement } = useDesigner();
    const form = useForm<basePropertiesSchemaType>({
        resolver: zodResolver(basePropertiesSchema),
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

    function applyChanges(values: basePropertiesSchemaType) {
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
                onSubmit={(e) => { e.preventDefault(); }}
                className="space-y-3">
                <LabelProperty form={form} />
                <DescriptionProperty form={form} />
                <RequiredProperty form={form} />
            </form>
        </Form>
    );
}

