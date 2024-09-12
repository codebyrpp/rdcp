import { EmailValidation } from "./EmailValidation";
import { PhoneNumberValidation } from "./PhoneNumberValidation";
import { LengthValidation } from "./LengthValidation";
import { BaseFieldValidation } from "../base";

export type TextFieldValidationType = "email" | "phoneNumber" | "length";

export type TextFieldValidationInstance = {
    type: TextFieldValidationType;
    schema: unknown;
};

export type TextFieldValidation = BaseFieldValidation<TextFieldValidationInstance> & {
    type: TextFieldValidationType;
};

export const TextValidations = {
    email: EmailValidation,
    phoneNumber: PhoneNumberValidation,
    length: LengthValidation
}; 

export const TextAreaValidations = {
    length: LengthValidation
};

