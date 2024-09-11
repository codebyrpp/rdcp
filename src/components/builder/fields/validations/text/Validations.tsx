import { EmailValidation } from "./EmailValidation";
import { PhoneNumberValidation } from "./PhoneNumberValidation";
import { LengthValidation } from "./LengthValidation";
import { InfoCircledIcon } from "@radix-ui/react-icons";

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