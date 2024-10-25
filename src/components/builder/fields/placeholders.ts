import { ElementsType } from "../components/FormElements";

export const QuestionPlaceholder: Record<ElementsType, string | undefined> = {
    TextField: "Short Answer",
    TitleDescField: undefined,
    NumberField: "Number",
    TextAreaField: "Long answer text",
    DateField: "Pick a Date",
    SelectField: "Select",
    CheckboxField: undefined,
    FileUploadField: "Upload file",
}