import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { PropertyProps } from './PropertyPropsType';
import { Textarea } from '@/components/ui/textarea';

const DescriptionProperty = ({ form }: PropertyProps) => {
    return (
        <FormField
            control={form.control}
            name="helperText"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                        <Textarea {...field} className='min-h-24' placeholder='Optional Description' />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default DescriptionProperty