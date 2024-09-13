import { Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

type ClearableSelectProps = {
    value: string | undefined;
    options: { key: string; label: string }[];
    onValueChange: (value: string | undefined) => void;
    placeholder?: string;
};

const ClearableSelect = ({
    value,
    options,
    onValueChange,
    placeholder = "Select an option",
}: ClearableSelectProps) => {
    return (
        <Select
            value={value}
            onValueChange={(newValue) => onValueChange(newValue.toString())}
        >
            <SelectTrigger>
                <SelectValue placeholder={placeholder} />
            </SelectTrigger>
            <SelectContent>
                {options.map((option) => (
                    <SelectItem key={option.key} value={option.key}>
                        {option.label}
                    </SelectItem>
                ))}
                <SelectSeparator />
                <Button
                    className="w-full px-2"
                    variant="secondary"
                    size="sm"
                    onClick={(e) => {
                        e.stopPropagation();
                        onValueChange(undefined);
                    }}
                >
                    Clear
                </Button>
            </SelectContent>
        </Select>
    );
};

export default ClearableSelect;
