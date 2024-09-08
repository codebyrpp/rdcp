import React from 'react'
import { PropertyProps } from './PropertyPropsType';
import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const PlaceholderProperty = ({ form }: PropertyProps) => {
    return (
        <FormField
            control={form.control}
            name="placeHolder"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>PlaceHolder</FormLabel>
                    <FormControl>
                        <Input {...field}
                            onKeyDown={(e) => {
                                if (e.key === "Enter") {
                                    e.currentTarget.blur();
                                }
                            }}
                        />
                    </FormControl>
                    <FormDescription>
                        The placeholder of the field.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default PlaceholderProperty