import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PropertyProps } from './PropertyPropsType';

const HelperTextProperty = ({ form }: PropertyProps) => {
    return (
        <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
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
                        The description of the field. <br /> It will be displayed below the label.
                    </FormDescription>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default HelperTextProperty