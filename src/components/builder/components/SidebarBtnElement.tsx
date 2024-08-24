import { useDraggable } from "@dnd-kit/core";
import { Button } from "../../ui/button";
import { FormElement } from "./FormElements";

function SidebarBtnElement({formElement}:{formElement: FormElement}) {
    const {label} = formElement.designerBtnElement;
    const draggable = useDraggable({
        id: 'designer-btn-${formElement.type}',
        data:{
            type: formElement.type,
            isDesignerBtnElement: true,
        },
    });
  return (
    <Button ref={draggable.setNodeRef} variant={"outline"} className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab" {...draggable.listeners} {...draggable.attributes}>
        <p className="text-xs">{label}</p>
    </Button>
  )
}

export function SidebarBtnElementDragOverlay({formElement}:{formElement: FormElement}) {
    const {label} = formElement.designerBtnElement;

  return (
    <Button variant={"outline"} className="flex flex-col gap-2 h-[120px] w-[120px] cursor-grab">
        <p className="text-xs">{label}</p>
    </Button>
  )
}

export default SidebarBtnElement;
