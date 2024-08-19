import { FaPlus } from 'react-icons/fa6'
import { AlertDialog, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogTitle, AlertDialogTrigger } from '../ui/alert-dialog'
import { Button } from '../ui/button'
import CreateProjectForm from '../forms/FormCreateProject'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'

const CreateProject = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex gap-2'>New Project
                    <FaPlus className='text-lg' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <h4 className="text-xl font-bold">
                            Create a New Project
                        </h4>
                    </DialogTitle>
                    <DialogDescription className="hidden">
                        Enter the project name and description to create a new project.
                    </DialogDescription>
                </DialogHeader>
                <CreateProjectForm
                    cancelActionButton={
                        <DialogClose asChild>
                            <Button variant='outline' className='border-red-500 text-red-500
                            hover:text-red-600
                                bg-white hover:bg-red-50'>Cancel</Button>
                        </DialogClose>
                    }
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateProject