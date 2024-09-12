import { BaseFieldValidation } from "../base";
import { ExclusiveMaxValidation } from "./ExclusiveMaxValidation";
import { ExclusiveMinValidation } from "./ExclusiveMinValidation";
import { MaxValidation } from "./MaxValidation";
import { MinValidation } from "./MinValidation";

export type NumberFieldValidationType = "exclusiveMin" | "min" | "exclusiveMax" | "max" | "range";

export type NumberFieldValidationInstance = {
    type: NumberFieldValidationType;
    schema: unknown;
};

export type NumberFieldValidation = BaseFieldValidation<NumberFieldValidationInstance> & {
    type: NumberFieldValidationType;
};

export const NumberValidations: Record<string, NumberFieldValidation> = {
    min: MinValidation,
    exclusiveMin: ExclusiveMinValidation,
    max: MaxValidation,
    exclusiveMax: ExclusiveMaxValidation,
};


