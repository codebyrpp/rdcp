import { dialogCloseWrapper } from "@/components/common/DialogCloseWrapper";
import FormCreateForm from "@/components/forms/FormCreateForm";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ReactNode } from "react";
import { FaPlus } from "react-icons/fa6";

const CreateForm = () => {
  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button className="flex gap-2">
                New Form
                <FaPlus className="text-lg" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Create a new form</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <DialogContent>
        <DialogHeader>
          <DialogTitle asChild>
            <h4 className="text-xl font-bold">Create a New Form</h4>
          </DialogTitle>
          <DialogDescription className="hidden">
            Enter the form name and description to create a new project.
          </DialogDescription>
        </DialogHeader>
        <FormCreateForm buttonWrapper={dialogCloseWrapper} />
      </DialogContent>
    </Dialog>
  );
};

export default CreateForm;
