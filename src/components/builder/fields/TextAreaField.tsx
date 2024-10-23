import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Label } from "../../ui/label";
import { useState } from "react";
import { Textarea } from "@/components/ui/textarea";
import { LetterText } from "lucide-react";
import { InputDescription, InputLabel } from "./common/Input";
import { TextAreaValidations, TextFieldValidationInstance, TextValidations } from "./validations/text/validations";
import useFormValidation from "./validations/useFormValidation";
import { baseExtraAttributes } from "./validations/base";
import { FieldErrors } from "./FieldErrors";
import TextBasedProperties from "./common/TextBasedProperties";

const type: ElementsType = "TextAreaField";
const PLACEHOLDER = "Long answer text";


export const TextAreaFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: baseExtraAttributes,
    }),
    designerBtnElement: {
        label: "Paragraph",
        icon: <LetterText />,
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: TextBasedProperties,

};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof baseExtraAttributes & {
        validation?: TextFieldValidationInstance;
    };
};

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText, validation } = element.extraAttributes;
    const ValidationInfo = validation ? TextValidations[validation.type].designerComponent : undefined;
    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Textarea readOnly disabled placeholder={PLACEHOLDER} />
        {validation && ValidationInfo && (
            <ValidationInfo
                validations={TextAreaValidations}
                validationInstance={validation} />
        )}
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
    const schema = element.extraAttributes.validation?.schema;
    const [value, setValue] = useState("");
    const { errors, validateFieldFromSchema } = useFormValidation(required);

    return (<div className="flex flex-col gap-2 w-full flex-grow">
        <Label className="font-semibold">
            {label}
            {required && "*"}
        </Label>
        {helperText && (<p className="text-muted-foreground text-[0.8rem]">{helperText}</p>)}
        <Textarea placeholder={PLACEHOLDER}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
                if (!submitValue) return;
                const isValid = validateFieldFromSchema(e.target.value, schema);
                submitValue(element.id, e.target.value, isValid);
            }} />
        {errors && (
            <FieldErrors errors={errors} />
        )}
    </div>
    );
}

