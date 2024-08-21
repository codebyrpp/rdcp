import { DndContext } from "@dnd-kit/core";
import Designer from "./Designer";
import { Button } from "@/components/ui/button";
import DragOverlayWrapper from "./DragOverlayWrapper";

const BuilderPage: React.FC = () => {
    return (
        <DndContext>
            <div className="flex flex-col h-screen">
                <div className="flex w-screen">
                    <div className="flex-1 py-2 px-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold">Project Name / Form Name</h1>
                            <div className="flex justify-end space-x-2">
                                <Button variant="outline">Preview</Button>
                                <Button>Save Edits</Button>
                                <Button>Publish</Button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex w-full flex-grow 
                items-center justify-center relative overflow-y-auto
                 bg-accent bg-slate-200 bg-center">
                    <Designer />
                </div>
            </div>
            <DragOverlayWrapper />
        </DndContext>
    );
};

export default BuilderPage;

