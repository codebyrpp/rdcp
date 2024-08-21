import { TextFeildFormElement } from "../../fields/TextField";

export type ElementsType = "TextField";

export type FormElement = {
    type: ElementsType;

    construct: (id:string) => FormElementInstance;

    designerBtnElement: {
        label: string;
    };

    designerComponent: React.FC;
    formComponent: React.FC;
    propertiesComponent: React.FC;
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
    TextField: TextFeildFormElement,
};