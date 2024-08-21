"use client";

import { ElementsType, FormElement } from "../builder/[id]/FormElements";

const type: ElementsType = "TextField";

export const TextFeildFormElement: FormElement = {
    type,
    construct: (id:string) => ({
        id,
        type,
        extraAttributes: {
            label: "Text Field",
            helperText: "Helper Text",
            required: false,
            placeHolder: "Value here...",
        },
    }),
    designerBtnElement: {
        label: "Text Field",
    },
    designerComponent: () => <div>Designer component</div>,
    formComponent: () => <div>Form component</div>,
    propertiesComponent: () => <div>Properties component</div>,
};