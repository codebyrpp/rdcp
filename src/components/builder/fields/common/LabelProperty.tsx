import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { PropertyProps } from './PropertyPropsType';


const LabelProperty = ({ form }: PropertyProps) => {
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
                        }} />
                </FormControl>
                <FormMessage />
            </FormItem>
        )} />;
}

export default LabelProperty