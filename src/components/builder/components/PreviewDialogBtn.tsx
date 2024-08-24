import { Button } from "@/components/ui/button";
import useDesigner from "../hooks/useDesigner";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FormElements } from "./FormElements";

function PreviewDialogBtn() {
    const { elements } = useDesigner();

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant={"outline"} className="gap-2">
                    Preview
                </Button>
            </DialogTrigger>
            
            {/* The Preview */}
            <DialogContent className="w-[80vw] max-w-full flex flex-col h-[90vh] bg-slate-200">
                <div className="flex-1 max-h-full h-full flex-grow flex items-center justify-center overflow-y-auto">
                    <div className="flex flex-col gap-1 flex-grow
                        bg-slate-200 rounded-md px-24 pt-5 
                        h-full w-full overflow-y-auto">
                        {elements.map((element) => {
                            const FormComponent = FormElements[element.type].formComponent;
                            return (
                                <div key={element.id} className="bg-white p-4 rounded-md">
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