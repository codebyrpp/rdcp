interface User {
    email: string;
    role: string;
}

export enum ProjectRole {
    OWNER = 'owner',
    MANAGER = 'manager',
    EDITOR = 'editor',
    DATA_ANALYST = 'data_analyst',
    DATA_ANALYST_VIEW_ONLY = 'data_analyst_view_only',
}



export default User;