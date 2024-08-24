import { formatDate } from '@/utils'
import { Button } from '@/components/ui/button'
import { Form } from '@/models/forms'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { ProjectRole } from '@/models/projects'
import useProjectNavigation from '@/hooks/useProjectNavigation'
import { ListItem, ListItemTitle } from '@/components/common/ListItems'
import { FaInfo, FaPen, FaTable } from 'react-icons/fa6'
import { FaCog } from 'react-icons/fa'

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

    const canDo = (roles: ProjectRole[], compareRoles: ProjectRole[]) => {
        return roles.some(role => compareRoles.includes(role))
    }

    const canDesign = (roles: ProjectRole[]) => {
        return canDo(roles, [ProjectRole.OWNER, ProjectRole.EDITOR])
    }
    const handleDesign = (e: any) => {
        e.stopPropagation()
        // Design form
    }

    const canCheckResponses = (roles: ProjectRole[]) => {
        return canDo(roles, [ProjectRole.OWNER, ProjectRole.DATA_ANALYST, ProjectRole.DATA_ANALYST_VIEW_ONLY])
    }
    const handleCheckResponses = (e: any) => {
        e.stopPropagation()
        // Check responses
    }

    const canViewDashboard = (roles: ProjectRole[]) => {
        return canCheckResponses(roles)
    }
    const handleViewDashboard = (e: any) => {
        e.stopPropagation()
        // View dashboard
    }

    const canEditSettings = (roles: ProjectRole[]) => {
        return canDo(roles, [ProjectRole.OWNER, ProjectRole.MANAGER])
    }
    const handleEditSettings = (e: any) => {
        e.stopPropagation()
        // Edit form
        navigateToFormSettings(form.projectId, form.id)
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
        <ListItem onClick={() => {
            // Redirect to the form
            
        }}>
            <div className='px-2 flex flex-col gap-1'>
                <div className="flex gap-2">
                    <ListItemTitle>{form.name}</ListItemTitle>
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
                <p className='text-sm text-slate-700 truncate text-ellipsis max-w-lg'>{form.description}</p>
            </div>
            <div className="flex gap-2 items-center">
                <div className='flex flex-col items-end'>
                    <div className='text-xs text-slate-700'>Last Modified</div>
                    <div className='text-xs text-slate-700'>{formatDate(form.updatedAt)}</div>
                </div>
                {
                    buttonVisibility.edit && <Button size={"sm"} variant={"warning"}
                        onClick={handleDesign} className='flex gap-2'>
                        Edit
                    </Button>
                }
                {
                    buttonVisibility.responses && <Button variant={"secondary"} size={"sm"}
                        onClick={handleCheckResponses} className='flex gap-2'>
                        Responses
                    </Button>
                }
                {
                    buttonVisibility.dashboard && <Button variant={"gray"} size={"sm"}
                        onClick={handleViewDashboard} className='flex gap-2'>
                        Dashboard
                    </Button>
                }
                {
                    buttonVisibility.settings && <Button variant={"icon"} size={"icon"}
                        onClick={handleEditSettings} className='flex gap-2'>
                        <FaCog />
                    </Button>
                }
            </div>
        </ListItem>
    )
}

export default FormListItem