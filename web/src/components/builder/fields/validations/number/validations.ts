import { BaseFieldValidation } from "../base";
import { ExclusiveMaxValidation } from "./ExclusiveMaxValidation";
import { ExclusiveMinValidation } from "./ExclusiveMinValidation";
import { MaxValidation } from "./MaxValidation";
import { MinValidation } from "./MinValidation";
import { EqualValidation } from "./EqualValidation";
import { NotEqualValidation } from "./NotEqualValidation";
import { BetweenValidation } from "./BetweenValidation";

export type NumberFieldValidationType = "exclusiveMin" | "min" | "exclusiveMax" | "max" 
    | "equal" | "notEqual" | "between" | "notBetween";

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
    equal: EqualValidation,
    notEqual: NotEqualValidation,
    between: BetweenValidation
};


