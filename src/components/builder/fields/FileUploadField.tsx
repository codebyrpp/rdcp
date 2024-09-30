import { zodResolver } from "@hookform/resolvers/zod";
import { ElementsType, FormElement, FormElementInstance, SubmitFunction } from "../components/FormElements";
import { Input } from "../../ui/input";
import { useEffect, useState } from "react";
import useDesigner from "../hooks/useDesigner";
import { useForm } from "react-hook-form";
import { FileIcon } from "lucide-react"; // Assuming this is an icon for file upload
import { InputDescription, InputLabel } from "./common/Input";
import { basePropertiesSchemaType, basePropertiesSchema, baseExtraAttributes } from "./validations/base";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import LabelProperty from "./common/LabelProperty";
import DescriptionProperty from "./common/DescriptionProperty";
import RequiredProperty from "./common/RequiredProperty";
import { Form } from "@/components/ui/form";

const type: ElementsType = "FileUploadField";

export const FileUploadFieldFormElement: FormElement = {
    type,
    construct: (id: string) => ({
        id,
        type,
        extraAttributes: {
            ...baseExtraAttributes,
            validation: {
                acceptSpecificTypes: false,
                selectedFileTypes: [],
                maxFileSize: 5,
            }
        },
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
        validation: {
            acceptSpecificTypes: boolean;
            selectedFileTypes?: string[] | undefined;
            maxFileSize?: number | undefined;
        }
    };
};

function DesignerComponent({
    elementInstance,
}: {
    elementInstance: FormElementInstance;
}) {
    const element = elementInstance as CustomInstance;
    const { label, required, helperText, validation } = element.extraAttributes;
    const { acceptSpecificTypes, selectedFileTypes, maxFileSize } = validation;
    return (
        <div className="flex flex-col gap-2 w-full">
            <InputLabel label={label} required={required} />
            {helperText && <InputDescription description={helperText} />}
            <Input type="file" disabled />
            {acceptSpecificTypes && selectedFileTypes && selectedFileTypes?.length > 0 && (
                <div className="text-muted-foreground text-sm">
                    Accepts: {selectedFileTypes?.join(", ")}
                </div>
            )}
            {maxFileSize && (
                <div className="text-muted-foreground text-sm">
                    Max File Size: {maxFileSize} MB
                </div>)}
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
        </div>
    );
}


const fileTypes = [
    { id: 'document', label: 'Document', description: 'doc, docx, pdf, txt' },
    { id: 'spreadsheet', label: 'Spreadsheet', description: 'xls, xlsx, csv' },
    { id: 'presentation', label: 'Presentation', description: 'ppt, pptx' },
    { id: 'pdf', label: 'PDF', description: 'pdf' },
    { id: 'image', label: 'Image', description: 'jpg, jpeg, png, gif, svg, tiff' },
    { id: 'audio', label: 'Audio', description: 'mp3, m4a, wav, aac' },
    { id: 'video', label: 'Video', description: 'mp4, mkv, mov, avi' },
];

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
                validation: {
                    acceptSpecificTypes,
                    selectedFileTypes,
                    maxFileSize,
                }
            },
        });
    }

    const [selectedFileTypes, setSelectedFileTypes] = useState<string[]>([])
    const [maxFileSize, setMaxFileSize] = useState<number>(5)
    const [acceptSpecificTypes, setAcceptSpecificTypes] = useState<boolean>(false)

    const handleFileTypeChange = (fileType: string) => {
        setSelectedFileTypes(prev =>
            prev.includes(fileType)
                ? prev.filter(type => type !== fileType)
                : [...prev, fileType]
        )
    }      

    // Apply changes to the element when selected file types or max file size changes
    useEffect(() => {
        updateElement(element.id, {
            id: element.id,
            type: element.type,
            extraAttributes: {
                label: element.extraAttributes.label,
                helperText: element.extraAttributes.helperText,
                required: element.extraAttributes.required,
                validation: {
                    acceptSpecificTypes,
                    selectedFileTypes,
                    maxFileSize,
                }
            },
        });
    }, [selectedFileTypes, maxFileSize, acceptSpecificTypes])

    return (
        <div className="flex flex-col gap-4">
            <Form {...form}>
                <form
                    onChange={form.handleSubmit(applyChanges)}
                    onSubmit={(e) => {
                        e.preventDefault();
                    }}
                    className="space-y-3"
                >
                    <LabelProperty form={form} />
                    <DescriptionProperty form={form} />
                    <RequiredProperty form={form} />
                </form>
            </Form>
            <hr />
            <div className="text-muted-foreground text-sm">File Validation</div>
            <div className="space-y-6">
                <div className="flex items-center space-x-2">
                    <Switch
                        id="accept-specific-types"
                        checked={acceptSpecificTypes}
                        onCheckedChange={setAcceptSpecificTypes}
                    />
                    <Label htmlFor="accept-specific-types">Accept specific types only</Label>
                </div>

                {acceptSpecificTypes && (
                    <div className="space-y-2">
                        <div className="grid grid-cols-3 gap-4">
                            {fileTypes.map((type) => (
                                <div key={type.id} className="flex space-x-2">
                                    <Checkbox
                                        id={type.id}
                                        checked={selectedFileTypes.includes(type.id)}
                                        onCheckedChange={() => handleFileTypeChange(type.id)}
                                    />
                                    <Label htmlFor={type.id}>{type.label}
                                        <div className="text-muted-foreground text-xs">{type.description}</div>
                                    </Label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                        <Label htmlFor="max-file-size">Maximum File Size (MB)</Label>
                        <Input
                            id="max-file-size"
                            type="number"
                            min="1"
                            value={maxFileSize}
                            onChange={(e) => setMaxFileSize(parseInt(e.target.value) || 1)}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
