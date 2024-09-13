import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormField } from '@/components/ui/form';
import { TextFieldValidationInstance, TextFieldValidation } from './Validations';


const phoneNumberSchema = {
    "type": "string",
    "pattern": "^[+]?[0-9]{1,4}?[-.\\s]?([0-9]{1,3})?[-.\\s]?([0-9]{1,4})[-.\\s]?([0-9]{1,9})$",
    "errorMessage": {
        "required": "Phone number is required",
        "pattern": "Phone number format is invalid"
    }
};

type CustomValidationInstance = TextFieldValidationInstance & {
    schema: typeof phoneNumberSchema;
}

const propertiesSchema = z.object({
    error: z.string().max(50, { message: "Error should be less than 50 characters" }),
});

function PropertiesComponent({ validationInstance }: { validationInstance: TextFieldValidationInstance }) {
    const { schema } = validationInstance as CustomValidationInstance;
    const form = useForm({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
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

export const PhoneNumberValidation: TextFieldValidation = {
    type: "phoneNumber",
    name: "Phone Number",
    schema: phoneNumberSchema,
    propertiesComponent: PropertiesComponent,
}