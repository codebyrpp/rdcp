import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { BaseFieldValidation } from "./base";

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
                <Select
                    value={value}
                    onValueChange={(newValue) => {
                        setValue(newValue.toString());
                        setValidationType(newValue.toString());
                        setKey(+new Date());
                    }}
                >
                    <SelectTrigger>
                        <SelectValue placeholder="Select a Validation Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {Object.entries(validations).map(([key, value]) => (
                            <SelectItem key={key} value={key}>
                                {value.name}
                            </SelectItem>
                        ))}
                        <SelectSeparator />
                        <Button
                            className="w-full px-2"
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation();
                                setValue(undefined);
                                setValidationType(undefined);
                            }}>
                            Clear
                        </Button>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
};

export default ResponseValidationProperties;
