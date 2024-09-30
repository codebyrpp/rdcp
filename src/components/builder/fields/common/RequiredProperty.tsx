import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form'
import { PropertyProps } from './PropertyPropsType'
import { Switch } from '@/components/ui/switch'

const RequiredProperty = ({ form }: PropertyProps) => {
    return (
        <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
                <FormItem className='flex !items-center gap-2'>
                    <FormLabel className='mb-0'>Required</FormLabel>
                    <FormControl>
                        <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}

export default RequiredProperty