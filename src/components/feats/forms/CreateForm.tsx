import FormCreateForm from '@/components/forms/FormCreateForm'
import { Button } from '@/components/ui/button'
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { FaPlus } from 'react-icons/fa6'

const CreateForm = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex gap-2'>New Form
                    <FaPlus className='text-lg' />
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle asChild>
                        <h4 className="text-xl font-bold">
                            Create a New Form
                        </h4>
                    </DialogTitle>
                    <DialogDescription className="hidden">
                        Enter the form name and description to create a new project.
                    </DialogDescription>
                </DialogHeader>
                <FormCreateForm
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

export default CreateForm