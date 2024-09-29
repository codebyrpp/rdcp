import { Form } from "./form";

export interface Project {
    id: string,
    name: string,
    description: string,
    createdAt: string,
    updated_at: string,
    forms?: Form[];
}