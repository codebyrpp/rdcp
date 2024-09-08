import { useDraggable } from "@dnd-kit/core";
import { Button } from "../../ui/button";
import { FormElement } from "./FormElements";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

function SidebarBtnElement({ formElement }: { formElement: FormElement }) {
  const { icon, label } = formElement.designerBtnElement;
  const draggable = useDraggable({
    id: `designer-btn-${formElement.type}`,
    data: {
      type: formElement.type,
      isDesignerBtnElement: true,
    },
  });
  return (
    <TooltipProvider delayDuration={100}>
      <Tooltip>
        <TooltipTrigger>
          <Button ref={draggable.setNodeRef}
            variant={"outline"} className="cursor-grab 
    flex flex-col h-15 aspect-square" {...draggable.listeners} {...draggable.attributes}>
            {icon}
          </Button>
        </TooltipTrigger>
        <TooltipContent
         side="right">
          <p>{label}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export function SidebarBtnElementDragOverlay({ formElement }: { formElement: FormElement }) {
  const { label, icon } = formElement.designerBtnElement;

  return (
    <Button variant={"outline"} className="flex flex-col gap-2 h-min w-[120px] cursor-grab">
      {icon}
      <p className="text-xs text-wrap">{label}</p>
    </Button>
  )
}

export default SidebarBtnElement;
