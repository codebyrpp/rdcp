import { FormElementInstance } from "@/components/builder/components/FormElements"

export type Form = {
    id: string,
    projectId: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    isPrivate?: boolean,
    isPublished?: boolean,
    multipleResponses?: boolean,
    responseMessage?: string,
}

export type FormWithSchema = Partial<Form> & {
    draft?: FormElementInstance[],
    schema?: FormElementInstance[]
}