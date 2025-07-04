import { Input } from '@/components/ui/input';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { NumberFieldValidation, NumberFieldValidationInstance } from './validations';
import { ValidationDesignerComponent } from '../ValidationDesignerView';
import { useEffect } from 'react';

type NotEqualSchema = {
    type: string,
    exclusiveMin: number,
    exclusiveMax: number,
    errorMessage: {
        exclusiveMin: string,
        exclusiveMax: string,
    }
}

const defaultSchema: NotEqualSchema = {
    type: "number",
    exclusiveMin: 0,
    exclusiveMax: 0,
    errorMessage: {
        exclusiveMin: "Value must not be equal to 0",
        exclusiveMax: "Value must not be equal to 0",
    }
}

type CustomValidationInstance = NumberFieldValidationInstance & {
    schema: NotEqualSchema;
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
            value: schema.exclusiveMin
        },
    });

    useEffect(() => {
        form.reset({
            value: schema.exclusiveMin,
        });
    }, [schema.exclusiveMin]);

    function applyChanges(values: z.infer<typeof propertiesSchema>) {
        update({
            ...validationInstance,
            schema: {
                type: schema.type,
                exclusiveMin: values.value,
                exclusiveMax: values.value, // Setting exclusiveMin and exclusiveMax to the same value to enforce "not equal"
                errorMessage: {
                    exclusiveMin: `Value must not be equal to ${values.value}`,
                    exclusiveMax: `Value must not be equal to ${values.value}`,
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

export const NotEqualValidation: NumberFieldValidation = {
    type: "notEqual",
    name: "Not Equal to",
    schema: defaultSchema,
    propertiesComponent: PropertiesComponent,
    designerComponent: ValidationDesignerComponent<NumberFieldValidationInstance>
}
