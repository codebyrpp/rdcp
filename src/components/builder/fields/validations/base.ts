import { z } from "zod";


export type BaseValidationInstance = {
    type: string;
    schema: unknown;
};

export type BaseFieldValidation<TInstance> = {
    type: string;  // Type should be a more specific union type in extended versions.
    name: string;
    schema: unknown;
    propertiesComponent: React.FC<{
        validationInstance: TInstance;
        update: (validation: TInstance) => void;
    }>;
    designerComponent: React.FC<{
        validationInstance: TInstance;
        validations: Record<string, BaseFieldValidation<TInstance>>;
    }>;
};

export const baseExtraAttributes = {
    label: "Unique Question",
    helperText: "",
    required: false,
};

export const basePropertiesSchema = z.object({
    label: z.string().min(2).max(50),
    helperText: z.string().max(1500),
    required: z.boolean().default(false),
});


export type basePropertiesSchemaType = z.infer<typeof basePropertiesSchema>;