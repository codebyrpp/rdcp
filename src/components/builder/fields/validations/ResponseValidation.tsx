import { useState } from "react";
import { Label } from "@/components/ui/label";
import { BaseFieldValidation } from "./base";
import ClearableSelect from "@/components/common/ClearableSelect";

type ResponseValidationPropertiesProps<TInstance> = {
    validations: Record<string, BaseFieldValidation<TInstance>>;
    validationType: string | undefined;
    setValidationType: (value: string | undefined) => void;
};

const ResponseValidationProperties = <TInstance,>({
    validations,
    validationType,
    setValidationType,
}: ResponseValidationPropertiesProps<TInstance>) => {
    const [value, setValue] = useState<string | undefined>(validationType);
    const [key, setKey] = useState(+new Date());

    return (
        <div key={key} className="flex flex-col gap-4">
            <div className="space-y-3">
                <Label>Validation Type</Label>
                <ClearableSelect
                    value={value}
                    options={Object.entries(validations).map(([key, value]) => ({
                        key,
                        label: value.name,
                    }))}
                    onValueChange={(newValue) => {
                        setValue(newValue);
                        setValidationType(newValue);
                        setKey(+new Date()); // To force re-render if needed
                    }}
                    placeholder="Select a Validation Type"
                />
            </div>
        </div>
    );
};

export default ResponseValidationProperties;
