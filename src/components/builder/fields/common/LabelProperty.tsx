import { FormField, FormItem, FormLabel, FormControl, FormDescription, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PropertyProps } from './PropertyPropsType';


const LabelProperty = ({form}:PropertyProps) => {
    return <FormField
    control={form.control}
    name="label"
    render={({ field }) => (
        <FormItem>
            <FormLabel>Label</FormLabel>
            <FormControl>
                <Input {...field}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") e.currentTarget.blur();
                    } } />
            </FormControl>
            <FormDescription>
                The label of the field. <br /> It will be displayed above the field.
            </FormDescription>
            <FormMessage />
        </FormItem>
    )} />;
}

export default LabelProperty