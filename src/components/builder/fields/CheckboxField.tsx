
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Label } from "../../ui/label";
import { CheckCheck } from "lucide-react";
import { selectExtraAttributes, SelectPropertiesComponent } from "./SelectField";
import { InputDescription, InputLabel } from "./common/Input";
import { Checkbox } from "@/components/ui/checkbox";
import { useEffect, useState } from "react";
import useFormValidation from "./validations/useFormValidation";
import { FieldErrors } from "./FieldErrors";

const type: ElementsType = "CheckboxField";
const extraAttributes = {
    ...selectExtraAttributes,
};
export const CheckboxFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes,
    }),
    designerBtnElement: {
        label: "Checkboxes",
        icon: <CheckCheck />
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
        {helperText && (<InputDescription description={helperText} />)}
        {/* Render the options as checkboxes */}
        <div className="grid gap-1.5 leading-none">
            {options.map((option: string, index: number) => {
                const id = `checkbox-${element.id}-${index}`;
                return (<div key={id} className="flex items-center space-x-2">
                    <Checkbox disabled id={id} defaultChecked={false} />
                    <Label htmlFor={id}>{option}</Label>
                </div>);
            })}
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
    const [isSelected, setIsSelected] = useState<Record<string, boolean>>({});
    const { errors, requiredValidation } = useFormValidation(required);

    useEffect(() => {
        const initialSelected: Record<string, boolean> = {};
        options.forEach((option) => {
            initialSelected[option] = false;
        });
        setIsSelected(initialSelected);
    }, [options]);

    const processInput = (isSelected: Record<string, boolean>) => {
        const selected = Object.keys(isSelected).filter((option) => isSelected[option]);
        if (!submitValue) return false;
        const areValuesSelected = selected.length > 0;
        const res = requiredValidation(areValuesSelected);
        if (res) return false;
        submitValue(element.id, selected);
        return true;
    };

    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        {/* Render the options as checkboxes */}
        <div className="grid gap-1.5 leading-none">
            {options.map((option: string, index: number) => {
                const id = `checkbox-${element.id}-${index}`;
                return (<div key={id} className="flex items-center space-x-2">
                    <Checkbox id={id} defaultChecked={false}
                        checked={isSelected[option]}
                        onCheckedChange={(checked) => {
                            const newSelected = {
                                ...isSelected,
                                [option]: checked.valueOf() as boolean,
                            };
                            setIsSelected(newSelected);
                            processInput(newSelected);
                        }}
                    />
                    <Label htmlFor={id} onClick={()=>{
                        const newSelected = {
                            ...isSelected,
                            [option]: !isSelected[option],
                        };
                        setIsSelected(newSelected);
                        processInput(newSelected);
                    }}>{option}</Label>
                </div>);
            })}
        </div>
        {
            errors && (
                <FieldErrors errors={errors} />
            )
        }
    </div>);
}

