import { FormField, FormItem, FormLabel, FormDescription, FormControl, FormMessage } from '@/components/ui/form'
import { PropertyProps } from './PropertyPropsType'
import { Switch } from '@/components/ui/switch'

const RequiredProperty = ({ form }: PropertyProps) => {
    return (
        <FormField
            control={form.control}
            name="required"
            render={({ field }) => (
                <FormItem>
                    <div>
                        <FormLabel>Required</FormLabel>
                        <FormDescription>
                        </FormDescription>
                    </div>
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