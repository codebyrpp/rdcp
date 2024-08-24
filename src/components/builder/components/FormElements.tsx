import { TitleFieldFormElement } from "../../fields/TitleField";
import { TextFieldFormElement } from "../../fields/TextField";

export type ElementsType = "TextField" | "TitleField";

export type FormElement = {
    type: ElementsType;

    construct: (id:string) => FormElementInstance;

    designerBtnElement: {
        label: string;
    };

    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;

    //validate: (formElement: FormElementInstance, currentValue: string) => boolean;
};

export type FormElementInstance = {
    id: string;
    type: ElementsType;
    extraAttributes?: Record<string, unknown>;
};

type FormElementsType = {
    [key in ElementsType] : FormElement;

};
export const FormElements: FormElementsType = {
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
};