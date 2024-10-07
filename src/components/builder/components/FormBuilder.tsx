import { DndContext, MouseSensor, useSensor, useSensors } from "@dnd-kit/core";
import { FormWithSchema } from "@/models/forms";
import Designer from "./Designer";
import DragOverlayWrapper from "./DragOverlayWrapper";
import SaveFormBtn from "./actions/SaveFormBtn";
import useDesigner from "../hooks/useDesigner";
import { useCallback, useEffect, useState } from "react";
import FormLoading from "./FormLoading";
import PreviewDialogBtn from "./actions/PreviewDialogBtn";
import { LeaveEditorButton } from "./actions/DiscardChangesBtn";
import useSaveShortcut from "../hooks/useSaveShortcut";
import useFormLock from "../hooks/useFormLock";
import PublishFormBtn from "./actions/PublishFormBtn";

const FormBuilder = ({ form }: { form: FormWithSchema }) => {
    const mouseSensor = useSensor(MouseSensor, {
        activationConstraint: {
            distance: 10,
        },
    });

    const sensors = useSensors(mouseSensor);

    const { setElements, saveFormChanges, elements } = useDesigner();
    const [previewKey, setPreviewKey] = useState(0);
    const [locked, setLocked] = useState(false);
    const [lockOwner, setLockOwner] = useState<string | null>(null);

    useEffect(() => {
        setPreviewKey(previewKey + 1);
    }, [form, elements]);

    const [isReady, setIsReady] = useState(false);

    const saveAction = () => {
        saveFormChanges(form.id!);
    };

    useSaveShortcut(saveAction);

    const { releaseLock, getLockInfo } = useFormLock(form.id!);

    useEffect(() => {
        const { locked, owner } = getLockInfo();
        setLocked(locked);
        setLockOwner(owner);
    }, [getLockInfo]);

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
        <div className="relative">
            <DndContext sensors={sensors}>
                <div className="flex flex-col h-screen">
                    <div className="flex w-screen">
                        <div className="flex-1 py-2 px-4 bg-gray-50">
                            <div className="flex justify-between items-center">
                                <h1 className="text-lg font-semibold">{form.name}</h1>
                                <div className="flex justify-end space-x-2">
                                    {
                                        locked && <div className="flex items-center">
                                            <span className="p-1 px-2 text-sm rounded-lg text-slate-800 font-bold bg-yellow-500">
                                                Form is locked by {lockOwner}
                                            </span>
                                        </div>
                                    }
                                    <PreviewDialogBtn key={previewKey} form={{
                                        ...form,
                                        draft: elements
                                    }} />
                                    {
                                        !locked && <>
                                            <SaveFormBtn action={saveAction} />
                                            <PublishFormBtn id={form.id!} />
                                        </>
                                    }
                                    <LeaveEditorButton
                                        projectId={form.projectId!}
                                        saveChanges={saveAction} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex flex-grow 
                items-center justify-center relative overflow-y-hidden
                 bg-accent bg-slate-200 bg-center w-screen">
                        {
                            locked && <div className="absolute z-[10] w-full h-screen bg-black/20" />
                        }
                        <Designer form={{
                            name: form.name!,
                            description: form.description!,
                        }} />
                    </div>
                </div>
                <DragOverlayWrapper />
            </DndContext>
        </div>
    );
};

export default FormBuilder;

