import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { TextFieldValidation, TextFieldValidationInstance } from './Validations';


const emailSchema = {
    "type": "string",
    "pattern": "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$",
    "errorMessage": {
        "required": "A valid email is required",
        "pattern": "Email is not valid"
    }
};

type CustomValidationInstance = TextFieldValidationInstance & {
    schema: typeof emailSchema;
}

const propertiesSchema = z.object({
    error: z.string().max(50, { message: "Error should be less than 50 characters" }),
});

function PropertiesComponent({ validationInstance, update }: {
    validationInstance: TextFieldValidationInstance,
    update: (validation: TextFieldValidationInstance) => void
}) {
    const { schema } = validationInstance as CustomValidationInstance;
    const form = useForm({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            error: schema.errorMessage.pattern,
        },
    });

    function applyChanges(values: z.infer<typeof propertiesSchema>) {
        update({
            ...validationInstance,
            schema: {
                type: schema.type,
                pattern: schema.pattern,
                errorMessage: {
                    required: schema.errorMessage.required,
                    pattern: values.error,
                }
            },
        });
    }

    return (
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)}
                onSubmit={(e) => { e.preventDefault(); }}>
                <div className='flex flex-col gap-4'>
                    <FormField control={form.control}
                        name="error"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Error Message</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        placeholder="Error Message" />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    )
}



export const EmailValidation: TextFieldValidation = {
    type: "email",
    name: "Email",
    schema: emailSchema,
    propertiesComponent: PropertiesComponent,
}