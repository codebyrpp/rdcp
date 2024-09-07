import { TitleFieldFormElement } from "../fields/TitleField";
import { TextFieldFormElement } from "../fields/TextField";
import { SubTitleFieldFormElement } from "../fields/SubTitleField";
import { ParagraphFieldFormElement } from "../fields/ParagraphField";
import { NumberFieldFormElement } from "../fields/NumberField";
import { TextAreaFieldFormElement } from "../fields/TextAreaField";
import { DateFieldFormElement } from "../fields/DateField";
import { SelectFieldFormElement } from "../fields/SelectField";
import { CheckboxFieldFormElement } from "../fields/CheckboxField";
import { ReactNode } from "react";

export type ElementsType = "TextField" | "TitleField" | "SubTitleField"  |  "ParagraphField" | "NumberField" | "TextAreaField" | "DateField" 
                            | "SelectField" | "CheckboxField";

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
    TextField: TextFieldFormElement,
    TitleField: TitleFieldFormElement,
    SubTitleField: SubTitleFieldFormElement,
    ParagraphField: ParagraphFieldFormElement,
    NumberField: NumberFieldFormElement,
    TextAreaField: TextAreaFieldFormElement,
    DateField: DateFieldFormElement,
    SelectField: SelectFieldFormElement,
    CheckboxField: CheckboxFieldFormElement,
};