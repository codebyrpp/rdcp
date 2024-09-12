import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { NumberFieldValidation, NumberFieldValidationInstance } from './validations';
import { ValidationDesignerComponent } from '../ValidationDesignerView';
import { useEffect } from 'react';

type MaxSchema = {
    type: string,
    maximum: number,
    errorMessage: {
        maximum: string,
    }
}

const defaultSchema: MaxSchema = {
    type: "number",
    maximum: 100,
    errorMessage: {
        maximum: "Maximum value is 100",
    }
}

type CustomValidationInstance = NumberFieldValidationInstance & {
    schema: MaxSchema;
}

const propertiesSchema = z.object({
    value: z.number()
});

function PropertiesComponent({ validationInstance, update }: {
    validationInstance: NumberFieldValidationInstance,
    update: (validation: NumberFieldValidationInstance) => void
}) {
    const { schema } = validationInstance as CustomValidationInstance;
    const form = useForm({
        resolver: zodResolver(propertiesSchema),
        mode: "onChange",
        defaultValues: {
            value: schema.maximum
        },
    });

    useEffect(() => {
        form.reset({
            value: schema.maximum,
        });
    }, [schema.maximum]);

    function applyChanges(values: z.infer<typeof propertiesSchema>) {
        update({
            ...validationInstance,
            schema: {
                type: schema.type,
                maximum: values.value,
                errorMessage: {
                    maximum: `Maximum value is ${values.value}`,
                }
            },
        });
    }

    return (
        <Form {...form}>
            <form onChange={form.handleSubmit(applyChanges)}
                onSubmit={(e) => { e.preventDefault(); }}>
                <div className='flex flex-col gap-4'>
                    <FormField control={form.control}
                        name="value"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="number"
                                        placeholder="Number"
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                    />
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

export const MaxValidation: NumberFieldValidation = {
    type: "max",
    name: "Less than or equal to",
    schema: defaultSchema,
    propertiesComponent: PropertiesComponent,
    designerComponent: ValidationDesignerComponent<NumberFieldValidationInstance>
}
