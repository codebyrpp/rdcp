import { EmailValidation } from "./EmailValidation";
import { PhoneNumberValidation } from "./PhoneNumberValidation";
import { LengthValidation } from "./LengthValidation";

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
};

type TextValidationTypes ={
    [key in TextFieldValidationType] : TextFieldValidation;
}

export const TextValidations: TextValidationTypes = {
    email: EmailValidation,
    phoneNumber: PhoneNumberValidation,
    length: LengthValidation
}; 