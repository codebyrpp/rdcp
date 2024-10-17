import { ProjectRole } from "@/models/projects"
import { has } from "lodash"

const authActionsMap = {
    project_settings: [],
    create_form: [ProjectRole.MANAGER],
    edit_form: [ProjectRole.MANAGER, ProjectRole.EDITOR],
    form_settings: [ProjectRole.MANAGER],
    form_responses: [ProjectRole.MANAGER, ProjectRole.DATA_ANALYST],
}

export type AuthAction = keyof typeof authActionsMap

const useAuthorization = (roles: ProjectRole[]) => {
    const hasPermission = (action: AuthAction) => {
        // if owner then has permission to do anything
        if (roles.includes(ProjectRole.OWNER)) return true;
        return authActionsMap[action].some(role => roles.includes(role))
    }

    return { hasPermission };
}

export { useAuthorization };