import { FormElementInstance } from "@/components/builder/components/FormElements"

export interface Form{
    id: string,
    projectId: string,
    name: string,
    description: string,
    createdAt: string,
    updatedAt: string,
    isPrivate?: boolean,
    isPublished?: boolean,
    multipleResponses?: boolean,
    responseMessage?: string
}

export interface FormWithSchema extends Form{
    elements: FormElementInstance[]
}