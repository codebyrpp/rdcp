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
import { useCreateProjectViewModel } from "@/viewmodels/projects"
import { Textarea } from "../ui/textarea"
import { ReactNode } from "react"


export default function CreateProjectForm({
    cancelActionButton
}: {
    cancelActionButton: ReactNode
}) {

    const { form, handleCreateProject, isLoading } = useCreateProjectViewModel();
    return (
        <div className={"w-full"}>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(handleCreateProject)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Project Name is Required." {...field} />
                                </FormControl>
                                <FormMessage  />
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

