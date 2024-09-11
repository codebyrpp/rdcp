import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { TextFieldValidationInstance, TextFieldValidation, CommonTextValidationDesignerComponent } from './Validations';
import { useEffect } from 'react';

const lengthSchema = {
    "type": "string",
    "minLength": 1,
    "maxLength": 50,
    "errorMessage": {
        "minLength": "Length is too short",
        "maxLength": "Length is too long"
    }
};

type CustomValidationInstance = TextFieldValidationInstance & {
    schema: typeof lengthSchema;
}

const propertiesSchema = z.object({
    min: z.number().min(0, "Minimum length must be at least 0"),
    max: z.number().min(1, "Maximum length must be at least 1"),
}).refine((data) => data.max >= data.min, {
    message: "Maximum length must be greater than minimum length",
    path: ["max"],
});;

function PropertiesComponent({ validationInstance, update }: {
    validationInstance: TextFieldValidationInstance,
    update: (validation: TextFieldValidationInstance) => void
}) {
    const { schema } = validationInstance as CustomValidationInstance;
    const form = useForm({
        resolver: zodResolver(propertiesSchema),
        mode: "onBlur",
        defaultValues: {
            min: schema.minLength,
            max: schema.maxLength,
        },
    });

    useEffect(() => {
        form.reset({
            min: schema.minLength,
            max: schema.maxLength,
        });
    }, [schema.minLength, schema.maxLength]);

    function applyChanges(values: z.infer<typeof propertiesSchema>) {
        const newSchema = {
            ...schema,
            minLength: values.min,
            maxLength: values.max,
            errorMessage: {
                minLength: `Length must be at least ${values.min} characters.`,
                maxLength: `Length should be less than ${values.max} characters.`,
            }
        };
        console.log(newSchema);
        update({
            ...validationInstance,
            schema: newSchema,
        });
    }

    return (
        <Form {...form}>
            <form onBlur={form.handleSubmit(applyChanges)}
                onSubmit={(e) => { e.preventDefault(); }}>
                <div className='flex gap-2'>
                    <FormField control={form.control}
                        name="min"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel>Minimum Length</FormLabel>
                                <FormControl>
                                    <Input placeholder="Number" {...field}
                                        type="number"
                                        min={0}
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField control={form.control}
                        name="max"
                        render={({ field }) => (
                            <FormItem className="flex flex-col gap-2">
                                <FormLabel>Maximum Length</FormLabel>
                                <FormControl>
                                    <Input {...field}
                                        type="number"
                                        min={1}
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                        placeholder="Number" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
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
    designerComponent: CommonTextValidationDesignerComponent
}