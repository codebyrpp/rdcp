import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { DialogDescription } from "@radix-ui/react-dialog";
import FormView from "../FormView";
import { FormWithSchema } from "@/models/forms";

function PreviewDialogBtn({ form }: { form: FormWithSchema }) {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <Button variant={"outline"} className="gap-2">
                    Preview
                </Button>
            </DialogTrigger>

            {/* The Preview */}
            <DialogContent 
            onOpenAutoFocus={(e) => e.preventDefault()}
            className="w-[80vw] max-w-full flex flex-col h-[90vh] bg-slate-200">
                <DialogTitle className="hidden">
                    Preview
                </DialogTitle>
                <DialogDescription className="text-sm mb-0">
                    This is a <span className="font-bold">preview </span>
                    of the form. You can interact with the form elements here.
                </DialogDescription>
                <div className="flex justify-center min-w-full overflow-y-auto">
                    <FormView form={form} isPreview={true} />
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PreviewDialogBtn;