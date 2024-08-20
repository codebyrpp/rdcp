import { Button } from '../ui/button'
import { FaTrash } from 'react-icons/fa6'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { useParams } from 'react-router-dom'
import { useDeleteProjectMutation } from '@/state/apiSlices/projectsApi'
import useProject from '@/hooks/useProject'
import { ToastAction } from '../ui/toast'
import { useToast } from '../ui/use-toast'

const DeleteProject = () => {
    return (
        <div className='flex flex-col'>
            <h5 className='text-lg font-bold mb-1'>Delete Project</h5>
            <p className='mb-2 text-muted-foreground text-sm'>
                Delete this project and all its associated data.
            </p>
            <div>
                <DeleteAction />
            </div>
        </div>
    )
}

const DeleteAction = () => {

    const { projectId } = useParams<{ projectId: string }>();
    const [deleteProjectMutation, { isLoading, isError, error, isSuccess }] = useDeleteProjectMutation()
    const { navigateToAllProjects } = useProject()
    const { toast } = useToast()

    const handleDelete = async () => {
        if (projectId) {
            try {
                await deleteProjectMutation({ projectId }).unwrap();
                const t = toast({
                    variant: 'success',
                    title: 'Project deleted successfully',
                });
                setTimeout(() => {
                    t.dismiss();
                }, 3000);
                navigateToAllProjects();

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
                        Delete Project
                    </h4>
                </DialogTitle>
                <DialogDescription className='text-slate-900'>
                    Are you sure you want to delete this project?
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