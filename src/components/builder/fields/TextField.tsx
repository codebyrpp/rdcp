import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Input } from "../../ui/input";
import { useState } from "react";
import { Type } from "lucide-react";
import { InputDescription, InputLabel } from "./common/Input";
import { TextFieldValidationInstance, TextValidations } from "./validations/text/validations";
import useFormValidation from "./validations/useFormValidation";
import { baseExtraAttributes } from "./validations/base";
import { FieldErrors } from "./FieldErrors";
import { TextBasedDesignerComponent, TextBasedInstance, TextBasedProperties } from "./common/TextBasedComponents";
import { QuestionPlaceholder } from "./placeholders";

const type: ElementsType = "TextField";
const PLACEHOLDER = QuestionPlaceholder[type];


export const TextFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: baseExtraAttributes,
    }),
    designerBtnElement: {
        label: "Short Answer",
        icon: <Type />,
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: TextBasedProperties,

};

type CustomInstance = TextBasedInstance;

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    return <TextBasedDesignerComponent
        textBasedInput={Input}
        elementInstance={elementInstance} />;
}

function FormComponent({
    elementInstance,
    submitValue,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const schema = element.extraAttributes.validation?.schema;
    const { errors, validateFieldFromSchema } = useFormValidation(required);
    const [value, setValue] = useState("");

    return (<div className="flex flex-col gap-2 w-full">
        <InputLabel label={label} required={required} />
        {helperText && (<InputDescription description={helperText} />)}
        <Input
            autoFocus={false}
            placeholder={PLACEHOLDER}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onBlur={(e) => {
                if (!submitValue)
                    return;
                const _value = e.target.value;
                const isValid = validateFieldFromSchema(_value, schema);
                submitValue(element.id, _value, isValid);
            }} />
        {errors && (
            <FieldErrors errors={errors} />
        )}
    </div>
    );
}


