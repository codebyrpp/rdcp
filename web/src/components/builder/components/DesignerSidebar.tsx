import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import FormElementsSidebar from "./FormElementsSidebar";
import PropertiesFormSidebar from "./PropertiesFormSidebar";
import { cn } from "@/lib/utils";

function DesignerPropertiesPanel() {
  const { selectedElement } = useDesigner();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(!!selectedElement); // Simplified to check if selectedElement exists
  }, [selectedElement]);

  return (
    <aside
      className={cn(
        `flex flex-col gap-2 border-l-2 w-full
          border-muted p-4 bg-background overflow-y-auto h-full 
          transform transition-transform duration-300 ease-in-out`,
        {
          "translate-x-0": isVisible,
          "translate-x-full": !isVisible,
        }
      )}
    >
      {selectedElement && <PropertiesFormSidebar />}
    </aside>
  );
}



function DesignerFormElementsPanel() {
  return (
    <aside className="p-2 bg-slate-300 overflow-y-auto h-full">
      <FormElementsSidebar />
    </aside>);
}

export { DesignerFormElementsPanel, DesignerPropertiesPanel };
