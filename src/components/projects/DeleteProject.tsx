import { Button } from '../ui/button'
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription } from '@radix-ui/react-dialog'
import { FaTrash } from 'react-icons/fa6'
import { DialogFooter, DialogHeader } from '../ui/dialog'

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
                <DialogDescription>
                    Are you sure you want to delete this project?
                    This action cannot be undone.
                </DialogDescription>
            </DialogHeader>
            <DialogFooter>
                <Button variant={"destructive"}>Delete</Button>
            </DialogFooter>
        </DialogContent>
    </Dialog>)
}

export default DeleteProject