import { DndContext } from "@dnd-kit/core";
import Designer from "./Designer";
import { Button } from "@/components/ui/button";
import DragOverlayWrapper from "./DragOverlayWrapper";

const BuilderPage: React.FC = () => {
    return (
    <DndContext>
        <main>
            <div className="flex w-screen">
                <div className="flex-1 p-8 bg-gray-50">
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
            <div className="flex w-full flex-grow items-center justify-center relative overflow-y-auto h-[590px] bg-accent bg-[url(/paper.svg)] bg-center ">
            <Designer />
            </div>
        
        </main>
        <DragOverlayWrapper />
    </DndContext>
    );
  };

export default BuilderPage;

