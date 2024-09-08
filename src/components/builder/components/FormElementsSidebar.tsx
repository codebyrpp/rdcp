import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";

function FormElementsSidebar() {
  return (
    <div>
         <p className="text-sm text-foreground/70 py-4">Drag and Drop Elements</p>
         <div className="grid grid-cols-1 md:grid-cols-3 space-y-2 place-items-center">
          <p className="text-sm text-muted-foreground col-span-1 md:col-span-3 my-2 place-self-start">Layout Elements</p>
          <SidebarBtnElement formElement={FormElements.TitleDescField} />
          <p className="text-sm text-muted-foreground col-span-1 md:col-span-3 my-2 place-self-start">Form Elements</p>
          <SidebarBtnElement formElement={FormElements.TextField} />
          <SidebarBtnElement formElement={FormElements.NumberField} />
          <SidebarBtnElement formElement={FormElements.TextAreaField} />
          <SidebarBtnElement formElement={FormElements.DateField} />
          <SidebarBtnElement formElement={FormElements.SelectField} />
          <SidebarBtnElement formElement={FormElements.CheckboxField} />
         </div>
    </div>
  );
}

export default FormElementsSidebar;
