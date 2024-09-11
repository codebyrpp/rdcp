import { EmailValidation } from "./EmailValidation";
import { PhoneNumberValidation } from "./PhoneNumberValidation";
import { LengthValidation } from "./LengthValidation";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { z } from "zod";
import { UseFormReturn } from "react-hook-form";
import { Form } from "@/components/ui/form";
import LabelProperty from "../../common/LabelProperty";
import DescriptionProperty from "../../common/DescriptionProperty";
import ResponseValidationProperties from "../ResponseValidation";
import RequiredProperty from "../../common/RequiredProperty";

export type TextFieldValidationType = "email" | "phoneNumber" | "length";

export type TextFieldValidationInstance = {
    type: TextFieldValidationType;
    schema: unknown;
};

export type TextFieldValidation = {
    type: TextFieldValidationType;
    name: string;
    schema: unknown;
    propertiesComponent: React.FC<{
        validationInstance: TextFieldValidationInstance;
        update: (validation: TextFieldValidationInstance) => void;
    }>;
    designerComponent: React.FC<{
        validationInstance: TextFieldValidationInstance;
    }>;
};

type TextValidationTypes ={
    [key in TextFieldValidationType] : TextFieldValidation;
}

export const TextValidations: TextValidationTypes = {
    email: EmailValidation,
    phoneNumber: PhoneNumberValidation,
    length: LengthValidation
}; 

export const TextAreaValidations = {
    length: LengthValidation
};

export function CommonTextValidationDesignerComponent({ validationInstance }: {
    validationInstance: TextFieldValidationInstance
}){
    return (
        <div className="text-muted-foreground text-xs flex items-center">
            <InfoCircledIcon className="w-4 h-4 inline-block mr-1" />
            <span>
                {TextValidations[validationInstance.type].name} Validation Applied
            </span>
        </div>
    )
}

export const commonPropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(1500),
    required: z.boolean().default(false),
});


export type commonPropertiesFormSchemaType = z.infer<typeof commonPropertiesSchema>;


export function FieldProperties({ form, applyChanges, validationInstance, setValidationType, validation, updateValidationInstance, validations }: {
    form: UseFormReturn<commonPropertiesFormSchemaType, any, undefined>,
    applyChanges: (values: commonPropertiesFormSchemaType) => void,
    validationInstance: TextFieldValidationInstance | undefined,
    setValidationType: (validationType: string | undefined) => void,
    validation: import("c:/Users/pavan/Projects/SEP/rdpc-web/src/components/builder/fields/validations/text/Validations").TextFieldValidation | undefined,
    updateValidationInstance: (validation: TextFieldValidationInstance | undefined) => void
    validations: Record<string, TextFieldValidation>
}) {
    return (
        <div className="flex flex-col gap-4">
            <Form {...form}>
                <form
                    onChange={form.handleSubmit(applyChanges)}
                    onSubmit={(e) => { e.preventDefault(); }}
                    className="space-y-3"
                >
                    <LabelProperty form={form} />
                    <DescriptionProperty form={form} />
                    <RequiredProperty form={form} />
                </form>
            </Form>
            <hr />
            <div className="text-muted-foreground text-sm">Response Validation</div>
            <ResponseValidationProperties
                key={validationInstance?.type || "no-validation"}
                validations={validations}
                validationType={validationInstance?.type}
                setValidationType={setValidationType}
            />
            {validation && (
                <validation.propertiesComponent
                    validationInstance={validationInstance ?? {
                        type: validation.type,
                        schema: validation.schema
                    }}
                    update={updateValidationInstance}
                />
            )}
        </div>
    );
}

