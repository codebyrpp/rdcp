import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { TextFieldValidationInstance, TextFieldValidation } from './Validations';

const lengthSchema = {
    "type": "string",
    "minLength": 1,
    "maxLength": 50,
    "errorMessage": {
        "type": "Length must be a string",
        "minLength": "Length is too short",
        "maxLength": "Length is too long"
    }
};

type CustomValidationInstance = TextFieldValidationInstance & {
    schema: typeof lengthSchema;
}

const propertiesSchema = z.object({
    min: z.number(),
    max: z.number(),
});

function PropertiesComponent({ validationInstance }: { validationInstance: TextFieldValidationInstance }) {
    const { schema } = validationInstance as CustomValidationInstance;
    const form = useForm({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            min: schema.minLength,
            max: schema.maxLength,
        },
    });

    function applyChanges(values: z.infer<typeof propertiesSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)}>
                <div className='flex flex-col gap-4'>
                    <FormField control={form.control}
                        name="min"
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <Label>Minimum Length</Label>
                                <Input {...field}
                                    placeholder="Number" />
                            </div>
                        )}
                    />
                    <FormField control={form.control}
                        name="max"
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <Label>Maximum Length</Label>
                                <Input {...field}
                                    placeholder="Number" />
                            </div>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}

export const LengthValidation: TextFieldValidation = {
    type: "length",
    name: "Length",
    schema: lengthSchema,
    propertiesComponent: PropertiesComponent,
}