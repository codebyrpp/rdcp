import { Button } from "../ui/button";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useProjectInfoViewModel } from "@/viewmodels/projects/single";
import { SectionWrapper } from "../common/wrapper";
import useProjectNavigation from "@/hooks/useProjectNavigation";

const FormUpdateProjectSettings = () => {

    const { project: { id: projectId } } = useProjectNavigation();
    const { projectForm: form, handleProjectUpdate: handleSubmit } =
        useProjectInfoViewModel({ projectId });

    return (
        <SectionWrapper>
            <div className="flex flex-col w-full">
                <h5 className='text-lg my-2 font-bold'>
                    Update Project Settings
                </h5>
                {
                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col gap-2 w-full">
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
                            <div className="flex justify-end">
                                <Button type="submit"
                                    variant={"success"}
                                    className='ml-auto'>Save Changes</Button>
                            </div>
                        </form>
                    </Form>
                }
            </div>
        </SectionWrapper>
    )
}

export default FormUpdateProjectSettings;
