import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { FormWithSchema } from "@/models/forms";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
import SaveFormBtn from "./actions/SaveFormBtn";
import useDesigner from "../hooks/useDesigner";
import { useEffect, useState } from "react";
import FormLoading from "./FormLoading";
import PreviewDialogBtn from "./actions/PreviewDialogBtn";
import DiscardChangesButton from "./actions/DiscardChangesBtn";
import useSaveShortcut from "../hooks/useSaveShortcut";
import useFormLock from "../hooks/useFormLock";

const FormBuilder = ({ form }: { form: FormWithSchema }) => {

    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const sensors = useSensors(mouseSensor);

    const { setElements, saveFormChanges, elements } = useDesigner();
    const [previewKey, setPreviewKey] = useState(0);

    useEffect(() => {
        setPreviewKey(previewKey + 1);
    }, [form, elements]);

    const [isReady, setIsReady] = useState(false);
    const saveAction = () => {
        saveFormChanges(form.id!);
    };

    useSaveShortcut(saveAction);
    const { releaseLock } = useFormLock(form.id!);

    useEffect(() => {
        if (isReady) return;
        setElements(form.draft || []);
        const isReadyTimeout = setTimeout(() => {
            setIsReady(true);
        }, 500);
        return () => clearTimeout(isReadyTimeout);
    }, [form, setElements]);

    if (!isReady)
        return (<FormLoading />);

    return (
        <DndContext sensors={sensors}>
            <div className="flex flex-col h-screen">
                <div className="flex w-screen">
                    <div className="flex-1 py-2 px-4 bg-gray-50">
                        <div className="flex justify-between items-center">
                            <h1 className="text-lg font-semibold">{form.name}</h1>
                            <div className="flex justify-end space-x-2">
                                <PreviewDialogBtn key={previewKey} form={{
                                    ...form,
                                    draft: elements
                                }}/>
                                <SaveFormBtn action={saveAction} />
                                <DiscardChangesButton />
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

export default FormBuilder;

