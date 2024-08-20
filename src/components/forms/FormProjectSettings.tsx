import FormWrapper from './FormWrapper'
import { Form } from 'react-router-dom'
import { Button } from '../ui/button'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Textarea } from '../ui/textarea'

const projectSchema = z.object({
    // name is a required string
    name: z.string().min(1, {
        message: "Name is required"
    }).max(255, {
        message: "Name is too long"
    }),
    description: z.string(),
})


const FormProjectSettings = () => {

    const form = useForm<z.infer<typeof projectSchema>>({
        resolver: zodResolver(projectSchema),
        defaultValues: {
            name: "",
            description: "",
        },
    });
    const handleSubmit = async (values: z.infer<typeof projectSchema>) => {
        // Call the API to create a project
        console.log(values)
    }

    return (
        <FormWrapper title="Sign In"
            description="to access your projects and forms">
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project Name is Required." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="description"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    {/* TextArea */}
                                    <Textarea {...field} placeholder="Description is Optional." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex space-x-2">
                        <Button type="submit">Update</Button>
                    </div>
                </form>
            </Form>
        </FormWrapper>
    )
}

export default FormProjectSettings