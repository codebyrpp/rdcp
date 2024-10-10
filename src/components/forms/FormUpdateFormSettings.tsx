import { Button } from "../ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormDescription,
} from "../ui/form";
import { Input } from "../ui/input";
import { Textarea } from "../ui/textarea";
import { useFormSettingsViewModel } from "@/viewmodels/forms/settings";
import { Switch } from "../ui/switch";
import { useParams } from "react-router-dom";
import { SectionWrapper } from "../common/wrapper";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip"; // Adjust your imports as necessary

const FormUpdateFormSettings = () => {
  const { formId } = useParams<{ formId: string }>();
  const { form, handleUpdateForm, isSuccess } =
    useFormSettingsViewModel(formId);

  return (
    <>
      {isSuccess && (
        <SectionWrapper>
          <div className="flex flex-col w-full">
            <h5 className="text-lg my-2 font-bold">Update Form Settings</h5>
            <TooltipProvider>
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleUpdateForm)}
                  className="flex flex-col gap-2 w-full"
                >
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Form Name is Required."
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  {/* Description Field with Tooltip */}
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            {...field}
                            placeholder="Description is Optional."
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isPublic"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mr-3">
                          Enable Public Survey
                        </FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Select this option to make the form public and
                          accessible to everyone.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="isPublished"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mr-3">Publish</FormLabel>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Select this option to publish the form. Once
                          published, the form shall be available for responding
                          with the shared participants.
                        </FormDescription>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="multipleResponses"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="mr-3">
                          Multiple Responses
                        </FormLabel>
                        <FormControl>
                          <Switch
                            disabled={form.getValues().isPublic}
                            checked={
                              form.getValues().isPublic ? true : field.value
                            }
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <FormDescription>
                          Select this option to allow multiple responses to the
                          form. Note: This option is only available for private
                          forms. Public forms allow multiple responses only.
                        </FormDescription>
                      </FormItem>
                    )}
                  />

                  {/* Submit Button */}
                  <div className="flex my-3 justify-end">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button type="submit">Save Changes</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Save your changes to update the form settings.</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </form>
              </Form>
            </TooltipProvider>
          </div>
        </SectionWrapper>
      )}
    </>
  );
};

export default FormUpdateFormSettings;
