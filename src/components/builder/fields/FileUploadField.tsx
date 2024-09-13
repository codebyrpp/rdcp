"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { FileIcon } from "lucide-react"; // Assuming this is an icon for file upload
import { InputDescription, InputLabel } from "./common/Input";
import useFormValidation from "./validations/useFormValidation";
import { basePropertiesSchemaType, basePropertiesSchema, baseExtraAttributes } from "./validations/base";
import { FieldProperties } from "./validations/FieldProperties";
import useFieldValidation from "./validations/useFieldValidation";

const type: ElementsType = "FileUploadField";
const PLACEHOLDER = "Upload File";

export const FileUploadFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: baseExtraAttributes,
    }),
    designerBtnElement: {
        label: "File Upload",
        icon: <FileIcon />,
    },
    designerComponent: DesignerComponent,
    formComponent: FormComponent,
    propertiesComponent: PropertiesComponent,
};

type CustomInstance = FormElementInstance & {
    extraAttributes: typeof baseExtraAttributes & {
        // validation?: FileFieldValidationInstance;
    };
};

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    // const validation = element.extraAttributes.validation as FileFieldValidationInstance | undefined;
    // const ValidationInfo = validation ? FileValidations[validation.type].designerComponent : undefined;
    return (
        <div className="flex flex-col gap-2 w-full">
            <InputLabel label={label} required={required} />
            {helperText && <InputDescription description={helperText} />}
            <div className="border-dashed border-2 p-4 text-center">{PLACEHOLDER}</div>
            {/* {validation && ValidationInfo && (
                <ValidationInfo
                    validations={FileValidations}
                    validationInstance={validation}
                />
            )} */}
        </div>
    );
}

function FormComponent({
    elementInstance,
    submitValue,
}: {
    elementInstance: FormElementInstance;
    submitValue?: SubmitFunction;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText } = element.extraAttributes;
    const { errors, validateField } = useFormValidation(element.extraAttributes.validation?.schema);
    const [file, setFile] = useState<File | null>(null);

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const uploadedFile = event.target.files?.[0] || null;
        setFile(uploadedFile);
        if (uploadedFile && submitValue) {
            submitValue(element.id, uploadedFile);
        }
    };

    return (
        <div className="flex flex-col gap-2 w-full">
            <InputLabel label={label} required={required} />
            {helperText && <InputDescription description={helperText} />}
            <Input
                type="file"
                onChange={handleFileChange}
            />
            {errors && (
                <div className="text-red-500 text-xs">
                    {errors.map((error, index) => (
                        <div key={index}>{error.message}</div>
                    ))}
                </div>
            )}
        </div>
    );
}

function PropertiesComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;

    const { updateElement } = useDesigner();
    const form = useForm<basePropertiesSchemaType>({
        resolver: zodResolver(basePropertiesSchema),
        mode: "onChange",
        defaultValues: {
            label: element.extraAttributes.label,
            helperText: element.extraAttributes.helperText,
            required: element.extraAttributes.required,
        },
    });

    // const {
    //     validation,
    //     validationInstance,
    //     setValidationType,
    //     updateValidationInstance
    // } = useFieldValidation<FileFieldValidationInstance, FileFieldValidation>(element, form, FileValidations);

    useEffect(() => {
        form.reset(element.extraAttributes);
    }, [element, form]);

    function applyChanges(values: basePropertiesSchemaType) {
        const { label, helperText, required } = values;
        updateElement(element.id, {
            id: element.id,
            type: element.type,
            extraAttributes: {
                label,
                helperText,
                required,
                // validation: validationInstance
            },
        });
    }

    return (
        <>
        File upload field properties
        </>
        // <FieldProperties<FileFieldValidationInstance>
        //     form={form}
        //     applyChanges={applyChanges}
        //     validationInstance={validationInstance}
        //     setValidationType={setValidationType}
        //     validation={validation}
        //     updateValidationInstance={updateValidationInstance}
        //     validations={FileValidations}
        // />
    );
}
