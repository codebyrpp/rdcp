import { EmailValidation } from "./EmailValidation";
import { PhoneNumberValidation } from "./PhoneNumberValidation";
import { LengthValidation } from "./LengthValidation";
import { InfoCircledIcon } from "@radix-ui/react-icons";
import { BaseFieldValidation } from "../base";

export type TextFieldValidationType = "email" | "phoneNumber" | "length";

export type TextFieldValidationInstance = {
    type: TextFieldValidationType;
    schema: unknown;
};

export type TextFieldValidation = BaseFieldValidation<TextFieldValidationInstance> & {
    type: TextFieldValidationType;
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