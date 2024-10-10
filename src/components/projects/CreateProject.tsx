import { FaPlus } from "react-icons/fa6";
import { Button } from "../ui/button";
import CreateProjectForm from "../forms/FormCreateProject";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { dialogCloseWrapper } from "../common/DialogCloseWrapper";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components

const CreateProject = () => {
  return (
    <TooltipProvider>
      <Dialog>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="flex gap-2">
                New Project
                <FaPlus className="text-lg" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a new project with a custom name and description.</p>
          </TooltipContent>
        </Tooltip>
        <DialogContent>
          <DialogHeader>
            <DialogTitle asChild>
              <h4 className="text-xl font-bold">Create a New Project</h4>
            </DialogTitle>
            <DialogDescription className="hidden">
              Enter the project name and description to create a new project.
            </DialogDescription>
          </DialogHeader>
          <CreateProjectForm buttonWrapper={dialogCloseWrapper} />
        </DialogContent>
      </Dialog>
    </TooltipProvider>
  );
};

export default CreateProject;
