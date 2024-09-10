import { Label } from "@/components/ui/label";

interface InputLabelProps {
    label: string;
    required: boolean;
}

const InputLabel = ({ label, required }: InputLabelProps) => {
    return (
        <Label className="font-semibold">
            {label}
            {required && <span className="ml-1 text-red-500">*</span>}
        </Label>
    )
}

const InputDescription = ({ description }: { description: string }) => {
    return <p className="text-muted-foreground text-[0.8rem] text-wrap whitespace-pre-wrap">{description}</p>
}

export {InputLabel, InputDescription};