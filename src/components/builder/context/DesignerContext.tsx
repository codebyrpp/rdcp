"use client";

import { createContext, Dispatch, ReactNode, SetStateAction, useState } from "react";
import { useSaveFormMutation } from "@/state/apiSlices/formsApi";
import { FormElementInstance } from "../components/FormElements";
import { useToast } from "@/components/ui/use-toast";

type DesignerContextType = {
    elements: FormElementInstance[];
    setElements: Dispatch<SetStateAction<FormElementInstance[]>>;
    addElement: (index: number, element: FormElementInstance) => void;
    removeElement: (id: string) => void;

    selectedElement: FormElementInstance | null;
    setSelectedElement: Dispatch<SetStateAction<FormElementInstance | null>>;

    updateElement: (id: string, element: FormElementInstance) => void;
    saveFormChanges: (formId: string) => void;
};

export const DesignerContext = createContext<DesignerContextType | null>(null);

export default function DesignerContextProvider({
    children,
}: {
    children: ReactNode;

}) {
    const [elements, setElements] = useState<FormElementInstance[]>([]);
    const [selectedElement, setSelectedElement] = useState<FormElementInstance | null>(null)
    const [saveFormMutation] = useSaveFormMutation();

    const addElement = (index: number, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            newElements.splice(index, 0, element);
            return newElements;
        });
        setSelectedElement(element);
    };

    const removeElement = (id: string) => {
        if (id === selectedElement?.id) {
            setSelectedElement(null);
        }
        setElements((prev) => prev.filter((element) => element.id !== id));
    };

    const updateElement = (id: string, element: FormElementInstance) => {
        setElements((prev) => {
            const newElements = [...prev];
            const index = newElements.findIndex((el) => el.id === id);
            newElements[index] = element;
            return newElements;
        });
    };

    const { toast } = useToast();
    const saveFormChanges = (formId: string) => {
        try {
            // const jsonElements = JSON.stringify(elements);
            // localStorage.setItem(formId, jsonElements);

            saveFormMutation({ formId, schema: elements });

            // toast success
            toast({
                title: "Form Saved",
                variant: "success",
                description: "Changes to the form have been saved.",
                duration: 5000,
            });
        }
        catch (e) {
            toast({
                title: "Error",
                variant: "destructive",
                description: "An error occured while saving the form",
                duration: 5000,
            });
        }
    }

    return (
        <DesignerContext.Provider
            value={{
                elements,
                setElements,
                addElement,
                removeElement,

                selectedElement,
                setSelectedElement,

                updateElement,
                saveFormChanges,
            }}>
            {children}
        </DesignerContext.Provider>
    );
}