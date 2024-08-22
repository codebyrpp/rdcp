import { FaTrash } from 'react-icons/fa6'
import {
    Dialog, DialogClose, DialogContent,
    DialogDescription, DialogFooter,
    DialogHeader, DialogTitle, DialogTrigger
} from '@/components/ui/dialog'
import { useParams } from 'react-router-dom'
import useProjectNavigation from '@/hooks/useProjectNavigation'
import { useToast } from '@/components/ui/use-toast'
import { ToastAction } from '@/components/ui/toast'
import { Button } from '@/components/ui/button'
import { useDeleteFormMutation } from '@/state/apiSlices/formsApi'
import { SectionWrapper } from '@/components/common/wrapper'

const DeleteProject = () => {
    return (
        <SectionWrapper>
            <div className='flex justify-between items-center'>
                <div className="flex flex-col">
                    <h5 className='text-lg font-bold mb-1'>Delete Form</h5>
                    <p className='mb-2 text-muted-foreground text-sm'>
                        Delete this form and all its associated data.
                    </p>
                </div>
                <DeleteAction />
            </div>
        </SectionWrapper>
    )
}

const DeleteAction = () => {

    const { formId } = useParams<{ formId: string }>();
    const { projectId } = useParams<{ projectId: string }>();
    const [deleteFormMutation, { isLoading, isError, error, isSuccess }] = useDeleteFormMutation()
    const { navigateToProject } = useProjectNavigation()
    const { toast } = useToast()

    const handleDelete = async () => {
        if (formId) {
            try {
                await deleteFormMutation({ formId }).unwrap();
                toast({
                    title: 'Project deleted successfully',
                    duration: 5000,
                    variant: 'success'
                });
                navigateToProject(projectId ?? '');

            } catch (e) {
                toast({
                    variant: "destructive",
                    title: "Uh oh! Something went wrong.",
                    description: "There was a problem with your request.",
                    action: <ToastAction altText="Try again">Try again</ToastAction>,
                })
            }
        }
    }


    return (<Dialog>
        <DialogTrigger asChild>
            <Button
                className='flex gap-2'
                variant={"destructive"}>Delete
                <FaTrash />
            </Button>
        </DialogTrigger>
        <DialogContent>
            <DialogHeader>
                <DialogTitle asChild>
                    <h4 className="text-xl font-bold">
                        Delete Form
                    </h4>
                </DialogTitle>
                <DialogDescription className='text-slate-900'>
                    Are you sure you want to delete this form?
                    This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <DialogClose asChild>
                    <Button variant={"destructive"} disabled={isLoading}
                        onClick={handleDelete}>Delete</Button>
                </DialogClose>
            </DialogFooter>
        </DialogContent>
    </Dialog>)
}

export default DeleteProject