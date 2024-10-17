"use client"
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "../ui/textarea"
import { ReactNode } from "react"
import { useCreateFormViewModel } from "@/viewmodels/forms/create"
import useProjectNavigation from "@/hooks/useProjectNavigation"


interface FormCreateFormProps {
    buttonWrapper: (children: ReactNode) => ReactNode;
}

export default function FormCreateForm({ buttonWrapper }: FormCreateFormProps) {

    const { project } = useProjectNavigation();
    const { form, handleCreateForm, isLoading } = useCreateFormViewModel({ projectId: project.id });

    return (
        <div className={"w-full"}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleCreateForm)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Form Name is Required." {...field} />
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

                    <div className="flex justify-end space-x-2">
                        {buttonWrapper(
                            <Button type="submit" disabled={isLoading}
                            >Create</Button>
                        )}
                    </div>
                </form>
            </Form>
        </div>
    );
}

