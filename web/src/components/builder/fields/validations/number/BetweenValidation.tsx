import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { NumberFieldValidation, NumberFieldValidationInstance } from './validations';
import { ValidationDesignerComponent } from '../ValidationDesignerView';
import { useEffect } from 'react';

type BetweenSchema = {
    type: string,
    minimum: number,
    maximum: number,
    errorMessage: {
        minimum: string,
        maximum: string,
    }
}

const defaultSchema: BetweenSchema = {
    type: "number",
    minimum: 0,
    maximum: 100,
    errorMessage: {
        minimum: "Value must be between 0 and 100",
        maximum: "Value must be between 0 and 100",
    }
}

type CustomValidationInstance = NumberFieldValidationInstance & {
    schema: BetweenSchema;
}

const propertiesSchema = z.object({
    minValue: z.number(),
    maxValue: z.number()
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
            minValue: schema.minimum,
            maxValue: schema.maximum
        },
    });

    useEffect(() => {
        form.reset({
            minValue: schema.minimum,
            maxValue: schema.maximum,
        });
    }, [schema.minimum, schema.maximum]);

    function applyChanges(values: z.infer<typeof propertiesSchema>) {
        update({
            ...validationInstance,
            schema: {
                type: schema.type,
                minimum: values.minValue,
                maximum: values.maxValue,
                errorMessage: {
                    minimum: `Value must be between ${values.minValue} and ${values.maxValue}`,
                    maximum: `Value must be between ${values.minValue} and ${values.maxValue}`
                }
            },
        });
    }

    return (
        <Form {...form}>
            <form onChange={form.handleSubmit(applyChanges)}
                onSubmit={(e) => { e.preventDefault(); }}>
                <div className='flex gap-4 items-center'>
                    <FormField control={form.control}
                        name="minValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="number"
                                        placeholder="Min Value"
                                        onChange={(e) => field.onChange(e.target.value ? Number(e.target.value) : '')}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <p className='text-sm'>and</p>
                    <FormField control={form.control}
                        name="maxValue"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <Input {...field}
                                        type="number"
                                        placeholder="Max Value"
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

export const BetweenValidation: NumberFieldValidation = {
    type: "between",
    name: "Between",
    schema: defaultSchema,
    propertiesComponent: PropertiesComponent,
    designerComponent: ValidationDesignerComponent<NumberFieldValidationInstance>
}
