import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { TextFieldValidationInstance } from './Validations';

const regexSchema = {
    "type": "string",
    "pattern": "",
    "errorMessage": {
        "pattern": "Regex is invalid"
    }
};

type CustomValidationInstance = TextFieldValidationInstance & {
    schema: typeof regexSchema;
}

const propertiesSchema = z.object({
    pattern: z.string().max(500, { message: "Pattern should be less than 500 characters" }),
});

function PropertiesComponent({ validationInstance }: { validationInstance: TextFieldValidationInstance }) {
    const { schema } = validationInstance as CustomValidationInstance;
    const form = useForm({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            pattern: schema.pattern,
            error: schema.errorMessage.pattern,
        },
    });

    function applyChanges(values: z.infer<typeof propertiesSchema>) {
        console.log(values);
    }

    return (
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)}>
                <div className='flex flex-col gap-4'>
                    <FormField
                        control={form.control}
                        name="pattern"
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <Label>Pattern</Label>
                                <Input {...field}

                                    placeholder="Regex Pattern" />
                            </div>)}
                    />

                    <FormField control={form.control}
                        name="error"
                        render={({ field }) => (
                            <div className="flex flex-col gap-2">
                                <Label>Error Message</Label>
                                <Input {...field}
                                    placeholder="Error Message" />
                            </div>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}
