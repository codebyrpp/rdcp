import { FormElements } from "./FormElements";
import SidebarBtnElement from "./SidebarBtnElement";

function FormElementsSidebar() {
  return (
    <div>
      <div className="grid grid-cols-1 gap-1 place-items-center">
        <SidebarBtnElement formElement={FormElements.TitleDescField} />
        <hr className="border-slate-500 border w-full" />
        <SidebarBtnElement formElement={FormElements.TextField} />
        <SidebarBtnElement formElement={FormElements.TextAreaField} />
        <SidebarBtnElement formElement={FormElements.NumberField} />
        <SidebarBtnElement formElement={FormElements.DateField} />
        <SidebarBtnElement formElement={FormElements.SelectField} />
        <SidebarBtnElement formElement={FormElements.CheckboxField} />
      </div>
    </div>
  );
}

export default FormElementsSidebar;
