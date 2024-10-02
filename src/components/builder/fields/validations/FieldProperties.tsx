import { UseFormReturn } from "react-hook-form";
import { BaseFieldValidation, BaseValidationInstance, basePropertiesSchemaType } from "./base";
import { Form } from "@/components/ui/form";
import LabelProperty from "../common/LabelProperty";
import DescriptionProperty from "../common/DescriptionProperty";
import RequiredProperty from "../common/RequiredProperty";
import ResponseValidationProperties from "./ResponseValidation";


type FieldPropertiesProps<TInstance extends BaseValidationInstance> = {
    form: UseFormReturn<basePropertiesSchemaType, any, undefined>;
    applyChanges: (values: basePropertiesSchemaType) => void;
    validationInstance: TInstance | undefined;
    setValidationType: (validationType: string | undefined) => void;
    validation: BaseFieldValidation<TInstance> | undefined;
    updateValidationInstance: (validation: TInstance | undefined) => void;
    validations: Record<string, BaseFieldValidation<TInstance>>;
};

// Utility function to create a default validation instance
function createDefaultValidationInstance<TInstance extends BaseValidationInstance>(
    validation: BaseFieldValidation<TInstance>
): TInstance {
    return {
        type: validation.type,
        schema: validation.schema,
        // Add other fields if necessary
    } as TInstance;
}

export function FieldProperties<TInstance extends BaseValidationInstance>({
    form,
    applyChanges,
    validationInstance,
    setValidationType,
    validation,
    updateValidationInstance,
    validations
}: FieldPropertiesProps<TInstance>) {
    return (
        <div className="flex flex-col gap-4">
            <Form {...form}>
                <form
                    onChange={form.handleSubmit(applyChanges)}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
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
                    validationInstance={validationInstance ?? createDefaultValidationInstance(validation)}
                    update={updateValidationInstance}
                />
            )}
        </div>
    );
}
