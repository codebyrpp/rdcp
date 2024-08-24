import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";

function FormElementsSidebar() {
  return (
    <div>
         <p className="text-sm text-foreground/70 py-4">Drag and Drop Elements</p>
         <div className="grid grid-cols-1 md:grid-cols-2 space-y-2 place-items-center">
          <p className="text-sm text-muted-foreground col-span-1 md:col-span-2 my-2 place-self-start">Layout Elements</p>
          <SidebarBtnElement formElement={FormElements.TextField} />
         </div>
    </div>
  );
}

export default FormElementsSidebar;
