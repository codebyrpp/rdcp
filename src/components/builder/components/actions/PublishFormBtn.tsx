import { Button } from '@/components/ui/button'
import { AlertDialog,
    AlertDialogAction,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogTitle,
    AlertDialogCancel,
    AlertDialogTrigger,
    AlertDialogHeader,
    AlertDialogFooter,
 } from '@/components/ui/alertdialog';
import { useTransition } from 'react';
import { toast } from '@/components/ui/usetoast';

function PublishFormBtn() {
    const [loading, startTransition] = useTransition();

    async function publishForm() {
        startTransition(() => {
            try {
                // await PublishForm();
                toast({
                    title: "Success",
                    description: "Your form is now available to the public",
                });
            } catch (error) {
                toast({
                    title: "Error",
                    description: "Something went wrong.",
                });
            }
        });
    }

  return (
    <AlertDialog>
        <AlertDialogTrigger asChild>
            <Button className='gap-2'>Publish</Button>  
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
                disabled={loading}
                onClick={publishForm}
                >
                    Publish
                </AlertDialogAction>
            </AlertDialogFooter>
        </AlertDialogContent>
    </AlertDialog>
  );
}

export default PublishFormBtn;
