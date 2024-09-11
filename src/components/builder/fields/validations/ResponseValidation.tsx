import { useState } from "react";
import { TextFieldValidation } from "./text/Validations";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const ResponseValidationProperties = (
    {
        validations,
        validationType,
        setValidationType
    }: {
        validations: Record<string, TextFieldValidation>,
        validationType: string | undefined,
        setValidationType: (value: string | undefined) => void
    }
) => {
    const [value, setValue] = useState<string | undefined>(validationType);
    const [key, setKey] = useState(+new Date());

    return (
        <div key={key} className="flex flex-col gap-4">
            <div className="space-y-3">
                <Label>Validation Type</Label>
                <Select value={value}
                    onValueChange={(newValue) => {
                        setValue(newValue.toString());
                        setValidationType(newValue.toString());
                        setKey(+new Date());
                    }}>
                    <SelectTrigger className="">
                        <SelectValue placeholder="Select a Validation Type" />
                    </SelectTrigger>
                    <SelectContent>
                        {
                            Object.entries(validations).map(([key, value]) => {
                                return (
                                    <SelectItem key={key} value={key}>
                                        {value.name}
                                    </SelectItem>
                                );
                            })
                        }
                        <SelectSeparator />
                        <Button
                            className="w-full px-2"
                            variant="secondary"
                            size="sm"
                            onClick={(e) => {
                                e.stopPropagation()
                                setValue(undefined)
                                setValidationType(undefined)
                            }}
                        >
                            Clear
                        </Button>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}

export default ResponseValidationProperties;