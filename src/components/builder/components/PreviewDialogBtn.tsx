import { Button } from "@/components/ui/button";
import useDesigner from "../hooks/useDesigner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FormElements } from "./FormElements";

function PreviewDialogBtn() {
    const {elements} = useDesigner();
    
    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="gap-2">
                    Preview
                </Button>
            </DialogTrigger>
            <DialogContent  className="w-2/3 h-screen max-h-screen max-w-full flex flex-col flex-grow p-0 gap-0">
                <div className="px-4 -y-2 border-b">
                    <p className="text-lg font-bold"> Form Preview</p>
                    <p className="text-sm text-muted-foreground">This is how your form will look like to your users.</p>
                </div>
                <div className="flex-grow flex items-center justify-center p-8 overflow-y-auto">
                    <div className="flex flex-col gap-4 flex-grow bg-gray-400 h-full w-full rounded-2xl p-8 overflow-y-auto">
                        {elements.map((element) => {
                            const FormComponent = FormElements[element.type].formComponent;
                            return (
                                <div key={element.id} className="bg-gray-200 p-4 rounded-md">
                                <FormComponent elementInstance={element} />
                                </div>
                            );
                    })}
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}

export default PreviewDialogBtn;