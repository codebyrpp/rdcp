import { Form } from "./forms";

export interface Collaborator {
    id: string;
    email: string;
    roles: ProjectRole[];
}

export interface Project {
    id: string,
    name: string,
    description: string,
    createdAt: string,
    updated_at: string,
    roles: ProjectRole[];
    forms?: Form[];
    collaborators?: Collaborator[];
}

export enum ProjectRole {
    OWNER = 'owner',
    MANAGER = 'manager',
    EDITOR = 'editor',
    DATA_ANALYST = 'data_analyst',
    DATA_ANALYST_VIEW_ONLY = 'data_analyst_view_only',
}

const _roleNameMap = {
    [ProjectRole.OWNER]: 'Owner',
    [ProjectRole.MANAGER]: 'Manager',
    [ProjectRole.EDITOR]: 'Editor',
    [ProjectRole.DATA_ANALYST]: 'Data Analyst',
    [ProjectRole.DATA_ANALYST_VIEW_ONLY]: 'Data Analyst (View Only)',
}

const _rolePermissions = {
    [ProjectRole.OWNER]: "Owners can do anything",
    [ProjectRole.MANAGER]: "Managers can create, edit, and delete forms, view and edit project data, and manage collaborators",
    [ProjectRole.EDITOR]:
        "Editors can view project data and forms",
    [ProjectRole.DATA_ANALYST]:
        "Data Analysts can view project data and forms",
    [ProjectRole.DATA_ANALYST_VIEW_ONLY]: "Data Analysts (View Only) can view project data and forms",
}


export const getRoleName = (role: ProjectRole) => {
    return _roleNameMap[role]
}

export const getRolePermissions = (role: ProjectRole) => {
    return _rolePermissions[role]
}