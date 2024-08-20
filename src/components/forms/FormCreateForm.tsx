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
import { useParams } from "react-router-dom"


export default function FormCreateForm({
    cancelActionButton
}: {
    cancelActionButton: ReactNode
}) {

    const { projectId } = useParams<{ projectId: string }>();
    const { form, handleCreateForm, isLoading } = useCreateFormViewModel({ projectId });

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
                        {cancelActionButton}
                        <Button type="submit" disabled={isLoading}
                        >Create</Button>
                    </div>
                </form>
            </Form>
        </div>

    )
}

