import { Form } from "./form";

export interface Project {
    id: number;
    name: string;
    description: string;
    createdAt: string;
    updatedAt: string;
    forms: Form[];
}
