import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { FormElements } from "../FormElements";
import useDesigner from "../../hooks/useDesigner";

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
                    <div className="flex flex-col items-center gap-1 flex-grow
                        bg-slate-200 rounded-md  pt-5 
                        h-full w-full overflow-y-auto">
                        <div className="bg-white w-3/5 p-4 rounded-md border-t-[6px] border-t-slate-500">
                            <p className="text-xl font-bold">Form Title</p>
                            <p className="text-sm text-gray-500">Form Description</p>
                        </div>
                        {elements.map((element) => {
                            const FormComponent = FormElements[element.type].formComponent;
                            return (
                                <div key={element.id} 
                                className="bg-white w-3/5 p-4 rounded-md focus-within:border-l-4 focus-within:border-l-slate-500">
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