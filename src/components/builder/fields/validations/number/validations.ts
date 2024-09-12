import { BaseFieldValidation } from "../base";

export type NumberFieldValidationType = "greaterThan" | "greaterThanOrEqual" | "lessThan" | "lessThanOrEqual" | "equalTo" | "notEqualTo" | "between" | "notBetween" | "isNumber" | "wholeNumber";

export type NumberFieldValidationInstance = {
    type: NumberFieldValidationType;
    schema: unknown;
};

export type NumberFieldValidation = BaseFieldValidation<NumberFieldValidationInstance> & {
    type: NumberFieldValidationType;
};

export const NumberValidations: Record<string, NumberFieldValidation> = {

};

