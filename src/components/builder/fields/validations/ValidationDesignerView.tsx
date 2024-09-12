import { InfoCircledIcon } from "@radix-ui/react-icons";
import { BaseFieldValidation, BaseValidationInstance } from "./base";

type Props<TInstance extends BaseValidationInstance> = {
    validationInstance: TInstance;
    validations: Record<string, BaseFieldValidation<TInstance>>;
};

export function ValidationDesignerComponent<TInstance extends BaseValidationInstance>
({ validationInstance, validations }: Props<TInstance>){
    return (
        <div className="text-muted-foreground text-xs flex items-center">
            <InfoCircledIcon className="w-4 h-4 inline-block mr-1" />
            <span>
                {validations[validationInstance.type].name} Validation Applied
            </span>
        </div>
    )
}