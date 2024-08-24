import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
import SaveFormBtn from "./SaveFormBtn";
import PreviewDialogBtn from "./PreviewDialogBtn";
import PublishFormBtn from "./PublishFormBtn";

const BuilderPage: React.FC = () => {

    const mouseSensor = useSensor(MouseSensor,{
        activationConstraint: {
            distance: 10,
        },
    });
    const sensors = useSensors(mouseSensor); 

    return (
        <DndContext sensors = {sensors}>
            <div className="flex flex-col h-screen">
                <div className="flex w-screen">
                    <div className="flex-1 py-2 px-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold">Project Name / Form Name</h1>
                            <div className="flex justify-end space-x-2">
                                <PreviewDialogBtn/>
                                <SaveFormBtn />
                                <PublishFormBtn/>
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

