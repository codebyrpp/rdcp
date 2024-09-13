import { TextFieldFormElement } from "../fields/TextField";
import { NumberFieldFormElement } from "../fields/NumberField";
import { TextAreaFieldFormElement } from "../fields/TextAreaField";
import { DateFieldFormElement } from "../fields/DateField";
import { SelectFieldFormElement } from "../fields/SelectField";
import { CheckboxFieldFormElement } from "../fields/CheckboxField";
import { ReactNode } from "react";
import { TitleDescFieldFormElement } from "../fields/TitleDescField";

export type ElementsType = "TextField" | "TitleDescField" | "NumberField" | "TextAreaField" | "DateField" 
                            | "SelectField" | "CheckboxField";

export type SubmitFunction = (key: string, value: string | number | string[]) => void;

export type FormElement = {
    type: ElementsType;

    construct: (id:string) => FormElementInstance;

    designerBtnElement: {
        label: string;
        icon?: ReactNode;
    };

    designerComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;
    formComponent: React.FC<{
        elementInstance: FormElementInstance;
        submitValue?: SubmitFunction;
    }>;
    propertiesComponent: React.FC<{
        elementInstance: FormElementInstance;
    }>;

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
    TitleDescField: TitleDescFieldFormElement,
    TextField: TextFieldFormElement,
    TextAreaField: TextAreaFieldFormElement,
    NumberField: NumberFieldFormElement,
    DateField: DateFieldFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField: CheckboxFieldFormElement,
};