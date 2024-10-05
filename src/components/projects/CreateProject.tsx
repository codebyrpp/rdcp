import { FaPlus } from 'react-icons/fa6'
import { Button } from '../ui/button'
import CreateProjectForm from '../forms/FormCreateProject'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog'
import { dialogCloseWrapper } from '../common/DialogCloseWrapper'

const CreateProject = () => {
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button className='flex gap-2' data-testid="new-project-button">New Project
                    <FaPlus className='text-lg' />
                </Button>
            </DialogTrigger>
            <DialogContent data-testid="create-project-dialog">
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
                    buttonWrapper={dialogCloseWrapper}
                />
            </DialogContent>
        </Dialog>
    )
}

export default CreateProject