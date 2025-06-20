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
import { useCreateProjectViewModel } from "@/viewmodels/projects/create"


interface FormCreateFormProps {
    buttonWrapper: (children: ReactNode) => ReactNode;
}

export default function CreateProjectForm({ buttonWrapper }: FormCreateFormProps) {

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
                                    <Input data-testid="project-name-input" placeholder="Project Name is Required." {...field} />
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
                                    <Textarea data-testid="project-description-input" {...field} placeholder="Description is Optional." />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="flex justify-end space-x-2">
                        {
                            buttonWrapper(
                                <Button data-testid="create-project-button" type="submit" disabled={isLoading}
                                >Create</Button>
                            )
                        }
                    </div>
                </form>
            </Form>
        </div>

    )
}

