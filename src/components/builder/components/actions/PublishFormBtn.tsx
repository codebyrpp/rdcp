import { Button } from '@/components/ui/button'
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogTrigger,
    AlertDialogHeader,
    AlertDialogFooter,
} from '@/components/ui/alertdialog';
import { useState, useTransition } from 'react';
import { usePublishFormMutation } from '@/state/apiSlices/formsApi';
import { useToast } from '@/components/ui/use-toast';
import { Link } from 'react-router-dom';

function PublishFormBtn({ id, save, hasChanges }: { id: string, save: () => Promise<void>, hasChanges: boolean }) {
    const [isLoading, setIsLoading] = useState(false);
    const [publishForm] = usePublishFormMutation();

    const { toast } = useToast();

    async function publishFormHandler() {
        setIsLoading(true);
        try {
            await publishForm({ formId: id });
            toast({
                title: "Success",
                description: "Your form is now available to the public",
                action: (
                    <Button asChild>
                        <a href={`/forms/${id}/view`} target="_blank" rel="noreferrer">
                            View Form
                        </a>
                    </Button>
                ),
                variant: "success",
                duration: 5000
            });
        } catch (error) {
            toast({
                title: "Error",
                description: "Something went wrong.",
            });
        }
        setIsLoading(false);
    }

    return (
        <AlertDialog>
            <AlertDialogTrigger asChild>
                <Button
                    disabled={isLoading || !hasChanges}
                    variant={"success"} className='gap-2'>Publish</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>Are you sure you want to publish this form?</AlertDialogTitle>
                </AlertDialogHeader>
                <AlertDialogDescription>
                    <span className='font-bold'>This action is can not be undone.</span>
                    <br />
                    <br />
                    <span className="font-bold">Note:</span>
                    After publishing you will be able to collect submissions from the public.
                </AlertDialogDescription>
                <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        disabled={isLoading}
                        onClick={() => {
                            if (hasChanges) {
                                save().then(() => {
                                    publishFormHandler();
                                });
                            } else {
                                publishFormHandler();
                            }
                        }}
                    >
                        Publish
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

export default PublishFormBtn;
