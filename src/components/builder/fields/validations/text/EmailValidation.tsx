import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { TextFieldValidation, TextFieldValidationInstance } from './Validations';


const emailSchema = {
    "type": "string",
    "format": "email",
    "errorMessage": {
        "required": "A valid email is required",
        "format": "Email is not valid"
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
            error: schema.errorMessage.format,
        },
    });

    function applyChanges(values: z.infer<typeof propertiesSchema>) {
        const newSchema = {
            ...schema,
            errorMessage: {
                ...schema.errorMessage,
                format: values.error,
            }
        };

        update({
            ...validationInstance,
            schema: newSchema,
        });
    }

    return (
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)}
            onSubmit={(e) => {e.preventDefault();}}>
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