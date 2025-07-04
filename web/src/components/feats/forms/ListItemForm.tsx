import { formatDate } from '@/utils'
import { Button } from '@/components/ui/button'
import { Form } from '@/models/forms'
import { Badge } from '@/components/ui/badge'
import { useEffect, useState } from 'react'
import { ProjectRole } from '@/models/projects'
import useProjectNavigation from '@/hooks/useProjectNavigation'
import { ListItem, ListItemTitle } from '@/components/common/ListItems'
import { FaCog } from 'react-icons/fa'
import { Link2Icon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import { useAuthorization } from '@/viewmodels/authorization'

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

    const { project,
        navigateToFormSettings, navigateToFormResponses,
        navigateToForm, navigateToFormDesigner } = useProjectNavigation()

    const { hasPermission } = useAuthorization(roles);

    const canDesign = () => {
        return hasPermission('edit_form')
    }
    const handleDesign = (e: any) => {
        e.stopPropagation()
        // Design form
        navigateToFormDesigner(form.projectId, form.id)
    }

    const canCheckResponses = () => {
        return hasPermission('form_responses')
    }
    const handleCheckResponses = (e: any) => {
        e.stopPropagation()
        // Check responses
        navigateToFormResponses(project, form)
    }

    const canViewDashboard = () => {
        return canCheckResponses()
    }

    const canEditSettings = () => {
        return hasPermission('form_settings')
    }
    const handleEditSettings = (e: any) => {
        e.stopPropagation()
        // Edit form
        navigateToFormSettings(form)
    }

    useEffect(() => {
        setButtonVisibility({
            edit: canDesign(),
            responses: canCheckResponses(),
            dashboard: canViewDashboard(),
            settings: canEditSettings()
        })
    }, [])

    const { toast } = useToast()

    return (
        <ListItem onClick={() => {
            // Redirect to the form

        }}>
            <div className='px-2 flex flex-col gap-1'>
                <div className="flex gap-2">
                    <ListItemTitle>{form.name}</ListItemTitle>
                    <FormPrivacyBadge isPrivate={form.isPrivate!} />
                    <FormPublishStateBadge isPublished={form.isPublished!} />
                </div>
                <p className='text-sm text-slate-700 truncate text-ellipsis max-w-lg'>{form.description}</p>
            </div>
            <div className="flex gap-2 items-center">
                <div className='flex flex-col items-end'>
                    <div className='text-xs text-slate-700'>Last Modified</div>
                    <div className='text-xs text-slate-700'>{formatDate(form.updatedAt)}</div>
                </div>
                {
                    buttonVisibility.edit && <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button size={"sm"} variant={"warning"}
                                    onClick={handleDesign} className='flex gap-2'>
                                    Edit
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Design Form using the Form Builder</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
                {
                    buttonVisibility.responses && <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"success"} size={"sm"}
                                    onClick={handleCheckResponses} className='flex gap-2'>
                                    Responses
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>View the form submissions</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
                {
                    <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button onClick={() => { navigateToForm(form.id) }}
                                    variant={"secondary"} size={"sm"} className='flex gap-2 text-sm'>
                                    View
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>View Form</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
                {/* Copy Link */}
                <TooltipProvider>
                    <Tooltip>
                        <TooltipTrigger asChild>
                            <Button
                                onClick={() => {
                                    navigator.clipboard.writeText(`${window.location.origin}/forms/${form.id}/view`)
                                    toast({
                                        title: 'Link Copied',
                                        description: 'Form link copied to clipboard',
                                        variant: 'success',
                                        duration: 2000
                                    })
                                }}
                                variant={"icon"} size={"sm"} className='flex gap-2'>
                                <Link2Icon />
                            </Button>
                        </TooltipTrigger>
                        <TooltipContent>Copy Form Link</TooltipContent>
                    </Tooltip>
                </TooltipProvider>
                {
                    buttonVisibility.settings && <TooltipProvider>
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Button variant={"icon"} size={"icon"}
                                    onClick={handleEditSettings} className='flex gap-2'>
                                    <FaCog />
                                </Button>
                            </TooltipTrigger>
                            <TooltipContent>Edit Form Settings</TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                }
            </div>
        </ListItem>
    )
}

export const FormPrivacyBadge = ({ isPrivate }: { isPrivate: boolean }) => {
    return isPrivate ? <Badge variant={"outline"}
        className={"bg-blue-50 border-slate-600 border-2 text-slate-600 font-semibold"}>Private</Badge> :
        <Badge variant={"outline"} className='bg-blue-600 text-blue-50'>Public</Badge>

}

export const FormPublishStateBadge = ({ isPublished }: { isPublished: boolean }) => {
    return isPublished ? <Badge variant={"outline"} className='bg-green-500'>Published</Badge> :
        <Badge variant={"outline"} className='bg-yellow-500'>Draft</Badge>
}

export default FormListItem