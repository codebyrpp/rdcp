import { formatDate } from '@/utils'
import { Button } from '@/components/ui/button'
import { Form } from '@/models/forms'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { ProjectRole } from '@/models/projects'
import useProjectNavigation from '@/hooks/useProjectNavigation'

interface FormListItemProps {
    form: Form
    roles: ProjectRole[]
}

const FormListItem = ({ form, roles }: FormListItemProps) => {

    const [buttonVisibility, setButtonVisibility] = useState({
        edit: false,
        responses: false,
        dashboard: false,
        settings: false
    })

    const { navigateToFormSettings } = useProjectNavigation()

    const canDo = (roles: ProjectRole[], compareRoles:ProjectRole[]) => {
        return roles.some(role => compareRoles.includes(role))
    }

    const canDesign = (roles: ProjectRole[]) => {
        return canDo(roles, [ProjectRole.OWNER, ProjectRole.EDITOR])
    }

    const canCheckResponses = (roles: ProjectRole[]) => {
        return canDo(roles, [ProjectRole.OWNER, ProjectRole.DATA_ANALYST, ProjectRole.DATA_ANALYST_VIEW_ONLY])
    }

    const canViewDashboard = (roles: ProjectRole[]) => {
        return canCheckResponses(roles)
    }

    const canEditSettings = (roles: ProjectRole[]) => {
        return canDo(roles, [ProjectRole.OWNER, ProjectRole.MANAGER])
    }

    useEffect(() => {
        setButtonVisibility({
            edit: canDesign(roles),
            responses: canCheckResponses(roles),
            dashboard: canViewDashboard(roles),
            settings: canEditSettings(roles)
        })
    }, [roles])

    return (
        <div className='flex justify-between
     border border-slate-300 
     rounded-xl p-3 bg-slate-100'>
            <div className='flex flex-col gap-1'>
                <div className="flex gap-2">
                    <h5 className='text-lg font-bold'>{form.name}</h5>
                    {
                        form.isPrivate ? <Badge variant={"outline"} className='bg-blue-50 border-slate-600 border-2
                         text-slate-600 font-semibold'>Private</Badge> :
                            <Badge variant={"outline"} className='bg-blue-600 text-blue-50'>Public</Badge>
                    }
                    {
                        form.isPublished ? <Badge variant={"outline"} className='bg-green-500'>Published</Badge> :
                            <Badge variant={"outline"} className='bg-yellow-500'>Draft</Badge>
                    }
                </div>
                <p className='text-sm text-slate-700 truncate text-ellipsis max-w-sm'>{form.description}</p>
            </div>
            <div className="flex gap-3 items-center">
                <div className='flex flex-col items-end'>
                    <div className='text-sm text-slate-700'>Last Modified</div>
                    <div className='text-sm text-slate-700'>{formatDate(form.updatedAt)}</div>
                </div>
                {
                    buttonVisibility.edit && <Button variant={"secondary"} className='bg-[#f7d07f] hover:bg-yellow-400'
                        onClick={() => {
                        }}>
                        Edit
                    </Button>
                }
                {
                    buttonVisibility.responses && <Button variant={"secondary"} className='bg-slate-300 hover:bg-slate-400'
                        onClick={() => {
                        }}>
                        Responses
                    </Button>
                }
                {
                    buttonVisibility.dashboard && <Button variant={"outline"}
                        onClick={() => {
                        }}>
                        Dashboard
                    </Button>
                }
                {
                    buttonVisibility.settings && <Button className='bg-slate-600'
                        onClick={() => {
                            navigateToFormSettings(form.projectId, form.id)
                        }}>
                        Settings
                    </Button>
                }
            </div>
        </div>
    )
}

export default FormListItem