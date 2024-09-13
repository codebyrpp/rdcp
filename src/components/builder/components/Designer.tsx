"use client";

import { DragEndEvent, useDndMonitor, useDraggable, useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { ElementsType, FormElementInstance, FormElements } from "./FormElements";
import { idGenerator } from "../idGenerator";
import useDesigner from "../hooks/useDesigner";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { BiSolidTrash } from "react-icons/bi";
import { DesignerFormElementsPanel, DesignerPropertiesPanel } from "./DesignerSidebar";


function Designer() {
  const { elements, addElement, selectedElement, setSelectedElement, removeElement } = useDesigner();

  const droppable = useDroppable({
    id: "designer-drop-area",
    data: {
      isDesignerDropArea: true,
    },
  });

  useDndMonitor({
    onDragEnd: (event: DragEndEvent) => {
      const { active, over } = event;
      if (!active || !over) return;

      const isDesignerBtnElement = active.data?.current?.isDesignerBtnElement;
      const isDroppingOverDesignerDropArea = over.data?.current?.isDesignerDropArea;

      const droppingSidebarBtnOverDesignerDropArea = isDesignerBtnElement && isDroppingOverDesignerDropArea;

      if (droppingSidebarBtnOverDesignerDropArea) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());

        addElement(elements.length, newElement);
        return;
      }

      const isDroppingOverDesignerElemnetTopHalf = over.data?.current?.isTopHalfDesignerElement;
      const isDroppingOverDesignerElemnetBottomHalf = over.data?.current?.isBottomHalfDesignerElement;
      const isDroppingOverDesignerElemnet = isDroppingOverDesignerElemnetTopHalf || isDroppingOverDesignerElemnetBottomHalf;

      const droppingSidebarBtnOverDesignerElement = isDesignerBtnElement && isDroppingOverDesignerElemnet;

      if (droppingSidebarBtnOverDesignerElement) {
        const type = active.data?.current?.type;
        const newElement = FormElements[type as ElementsType].construct(idGenerator());

        const overId = over.data?.current?.elementId;

        const overElementIndex = elements.findIndex((el) => el.id === overId);
        if (overElementIndex === -1) {
          throw new Error("Element not found");
        }

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElemnetBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, newElement);
        return;
      }

      const isDraggingDesignerElement = active.data?.current?.isDesignerElement;

      const draggingDesignerElementOverAnotherDesignerElement = isDraggingDesignerElement && isDroppingOverDesignerElemnet;

      if (draggingDesignerElementOverAnotherDesignerElement) {
        const activeId = active.data?.current?.elementId;
        const OverId = over.data?.current?.elementId;

        const activeElementIndex = elements.findIndex((el) => el.id === activeId);
        const overElementIndex = elements.findIndex((el) => el.id === OverId);

        if (activeElementIndex === -1 || overElementIndex === -1) {
          throw new Error("Element not found");
        }

        const activeElement = { ...elements[activeElementIndex] };
        removeElement(activeId);

        let indexForNewElement = overElementIndex;
        if (isDroppingOverDesignerElemnetBottomHalf) {
          indexForNewElement = overElementIndex + 1;
        }
        addElement(indexForNewElement, activeElement);
      }
    },
  });

  return (
    <div className="flex w-screen overflow-hidden h-full relative">
      <DesignerFormElementsPanel />
      <div className="flex flex-col p-4 gap-1 w-screen overflow-y-auto" >
        <div className="flex justify-center" style={{
          width: "calc(100vw - 400px)",
        }}>
          <div className="max-w-[800px] flex-1 px-4">
            <div className="w-full bg-background p-4 rounded-md border-t-slate-500 border-t-[6px]">
              <p className="text-xl font-bold">Form Title</p>
              <p className="text-sm">Form Description</p>
            </div>
          </div>
        </div>
        <div style={{
          width: "calc(100vw - 400px)",
        }}
          className="h-full flex-1"
          onClick={() => {
            if (selectedElement) setSelectedElement(null);
          }}>

          <div ref={droppable.setNodeRef}
            className={cn(`max-w-[800px] min-h-full pb-64 m-auto rounded-xl 
            flex flex-col flex-grow items-center justify-start flex-1`)}>
            {!droppable.isOver && elements.length === 0 && (
              // Initial Drop zone when no element over it
              <div className="flex flex-col justify-center h-full flex-grow items-center">
                <p className="text-muted-foreground mt-2 text-md text-center">
                  Drag and drop elements from the <br /> left sidebar to create your form
                </p>
              </div>)}
            {droppable.isOver && elements.length === 0 && (
              // Initial Drop zone when an element is over it
              <DropZoneHint />
            )}
            {elements.length > 0 && (
              <div className="flex flex-col w-full gap-1 px-4">
                {elements.map((element) => (
                  <DesignerElementWrapper key={element.id} element={element} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="absolute right-0 top-0 h-full w-[400px] max-w-[400px] ">
        <DesignerPropertiesPanel />
      </div>
    </div>
  )
}

const DropZoneHint = () => (<div className="p-4 w-full">
  <div className="h-[120px] rounded-md bg-slate-300"></div>
</div>);

function DesignerElementWrapper({ element }: { element: FormElementInstance }) {
  const { removeElement, setSelectedElement, selectedElement } = useDesigner();

  const [mouseIsOver, setMouseIsOver] = useState<boolean>(false);
  const topHalf = useDroppable({
    id: element.id + "-top",
    data: {
      type: element.type,
      elementId: element.id,
      isTopHalfDesignerElement: true,
    },
  });

  const bottomHalf = useDroppable({
    id: element.id + "-bottom",
    data: {
      type: element.type,
      elementId: element.id,
      isBottomHalfDesignerElement: true,
    },
  });

  const draggable = useDraggable({
    id: element.id + "-drag-handler",
    data: {
      type: element.type,
      elementId: element.id,
      isDesignerElement: true,
    },
  });

  if (draggable.isDragging) return null;

  const DesignerElement = FormElements[element.type].designerComponent;
  return (
    <div
      ref={draggable.setNodeRef}
      {...draggable.listeners}
      {...draggable.attributes}
      className={cn(`relative flex flex-col bg-white
        hover:cursor-pointer rounded-md ring-1 ring-accent ring-inset border border-slate-300`,
      )}
      onMouseEnter={() => {
        setMouseIsOver(true);
      }}
      onMouseLeave={() => {
        setMouseIsOver(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setSelectedElement(element);
      }}
    >
      <div ref={topHalf.setNodeRef} className="absolute w-full h-1/2 rounded-t-md" />
      <div ref={bottomHalf.setNodeRef} className="absolute w-full h-1/2 rounded-b-md" />
      {mouseIsOver && (
        <>
          <div className="absolute right-0 h-full group">
            <Button className="flex justify-center h-full border rounded-md rounded-l-none bg-red-400 group-hover:bg-red-500"
              variant={"outline"}
              onClick={(e) => {
                e.stopPropagation();
                removeElement(element.id);
              }}>
              <BiSolidTrash className="h-8 w-6" />
            </Button>
          </div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <p className="text-sm">Click for properties or drag to move</p>
          </div>
        </>
      )}
      {topHalf.isOver && (
        <div className="absolute top-0 w-full rounded-md h-[7px] bg-primary rounded-b-none" />
      )}
      {bottomHalf.isOver && (
        <div className="absolute bottom-0 w-full rounded-md h-[7px] bg-primary rounded-t-none" />
      )}
      <div className={cn("flex w-full items-center rounded-md bg-background p-4 pointer-events-none opacity-100",
        mouseIsOver && "opacity-30",
        selectedElement === element && "border-l-4 border-l-slate-500 elevation-2 shadow-md",
      )}>
        <DesignerElement elementInstance={element} />
      </div>
    </div>
  );
}

export default Designer;
