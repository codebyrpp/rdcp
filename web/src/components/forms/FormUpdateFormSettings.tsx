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
import { SectionWrapper } from "../common/wrapper";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
  TooltipProvider,
} from "../ui/tooltip"; // Adjust your imports as necessary
import { Form as FormModel } from "@/models/forms";
import { Link2Icon } from "lucide-react";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

const FormUpdateFormSettings = (props: {
  id: string;
  onUpdateForm?: (form: Partial<FormModel>) => void;
}) => {
  const { toast } = useToast()

  const { form, handleUpdateForm, isSuccess } =
    useFormSettingsViewModel(props.id, props.onUpdateForm);

  return (
    <>
      {isSuccess && (
        <SectionWrapper>
          <div className="flex flex-col w-full">
            <h5 className="text-lg my-2 font-bold">Update Form Settings</h5>
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
                {/* if is published */}
                {form.getValues().isPublished && (
                  <FormLink id={props.id} />
                )}
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
                  <TooltipProvider>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button type="submit">Save Changes</Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Save your changes to update the form settings.</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </form>
            </Form>
          </div>
        </SectionWrapper>
      )}
    </>
  );
};

export default FormUpdateFormSettings;

function FormLink(props: { id: string }) {

  const { toast } = useToast();
  const [copied, setCopied] = useState(false);

  return <div className="flex items-center gap-2 max-w-full">
    <FormLabel>{`${window.location.origin}/forms/${props.id}/view`}</FormLabel>
    <Button
      onClick={(e) => {
        e.preventDefault();
        navigator.clipboard.writeText(`${window.location.origin}/forms/${props.id}/view`);
        setCopied(true);
        toast({
          title: 'Link Copied',
          description: 'Form link copied to clipboard',
          variant: 'success',
          duration: 2000
        })
      }}
      variant={"icon"} size={"sm"} className='flex gap-2'>
      {
        copied ?
          <Link2Icon className="text-green-500" />
          :
          <Link2Icon />
      }
    </Button>
  </div>;
}

