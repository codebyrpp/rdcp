import { Form } from "./forms";

export interface Project{
    id: string,
    name: string,
    description: string,
    createdAt: string,
    updated_at: string,
    roles: ProjectRole[];
    forms?: Form[];
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

export const getRoleName = (role: ProjectRole) => {
    return _roleNameMap[role]
}