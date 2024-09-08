import { RegexValidation } from "./RegexValidation";
import { TextFieldValidation, TextFieldValidationType } from "./schemas";

type TextValidationTypes ={
    [key in TextFieldValidationType] : TextFieldValidation;
}

export const TextValidations: TextValidationTypes = {
    regex: RegexValidation,
}; 