import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { NumberFieldValidation, NumberFieldValidationInstance } from './validations';
import { ValidationDesignerComponent } from '../ValidationDesignerView';
import { useEffect } from 'react';

type EqualSchema = {
    type: string,
    minimum: number,
    maximum: number,
    errorMessage: {
        minimum: string,
        maximum: string,
    }
}

const defaultSchema: EqualSchema = {
    type: "number",
    minimum: 0,
    maximum: 0,
    errorMessage: {
        minimum: "Value must be equal to 0",
        maximum: "Value must be equal to 0",
    }
}

type CustomValidationInstance = NumberFieldValidationInstance & {
    schema: EqualSchema;
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
            value: schema.minimum
        },
    });

    useEffect(() => {
        form.reset({
            value: schema.minimum,
        });
    }, [schema.minimum]);

    function applyChanges(values: z.infer<typeof propertiesSchema>) {
        update({
            ...validationInstance,
            schema: {
                type: schema.type,
                minimum: values.value,
                maximum: values.value, // Set min and max to the same value to enforce equality
                errorMessage: {
                    minimum: `Value must be equal to ${values.value}`,
                    maximum: `Value must be equal to ${values.value}`,
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

export const EqualValidation: NumberFieldValidation = {
    type: "equal",
    name: "Equal to",
    schema: defaultSchema,
    propertiesComponent: PropertiesComponent,
    designerComponent: ValidationDesignerComponent<NumberFieldValidationInstance>
}
