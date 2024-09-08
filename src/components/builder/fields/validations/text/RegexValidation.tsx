import { TextFieldValidation, TextFieldValidationInstance, textValidations } from './schemas';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';


type CustomValidationInstance = TextFieldValidationInstance & {
    schema: typeof textValidations.regex.schema;
}

function PropertiesComponent({ validationInstance }: { validationInstance: TextFieldValidationInstance }) {
    const { schema } = validationInstance as CustomValidationInstance;

    return (
        <div className='flex flex-col gap-4'>
            <div className="flex flex-col gap-2">
                <Label>Pattern</Label>
                <Input value={schema.pattern}
                onChange={(e) => {
                    // update the schema
                    schema.pattern = e.target.value;
                }}
                 placeholder="Regex Pattern" />
            </div>
            <div className="flex flex-col gap-2">
                <Label>Custom Error</Label>
                <Input placeholder="Custom Error Message" />
            </div>
        </div>
    )
}

export const RegexValidation: TextFieldValidation = {
    type: "regex",
    schema: textValidations.regex.schema,
    propertiesComponent: PropertiesComponent,
}