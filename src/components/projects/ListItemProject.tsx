import { formatDate } from '@/utils'
import useProjectNavigation from '@/hooks/useProjectNavigation'
import { ProjectDTO } from '@/state/apiSlices/projectsApi'
import { getRoleName } from '@/models/projects'
import { FaCog } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa6'
import { ListItem, ListItemTitle } from '../common/ListItems'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

interface ProjectListItemProps {
    project: ProjectDTO
}

const ProjectListItem = ({ project }: ProjectListItemProps) => {

    const { navigateToProject, navigateToProjectSettings } = useProjectNavigation()

    const handleEditClick = (e: any) => {
        e.stopPropagation()
        navigateToProject(project.id)
    }
    const handleSettingsClick = (e: any) => {
        e.stopPropagation()
        navigateToProjectSettings(project.id)
    }

    return (
        <ListItem
            onClick={() => {
                navigateToProject(project.id)
            }}
        >
            <div className='px-2 flex flex-col gap-1'>
                <div className="flex gap-2 items-center">
                    <ListItemTitle>
                        {project.name}
                    </ListItemTitle>
                    <div className="">
                        {project.roles.map((role) => {
                            return (
                                <div key={role}
                                    className='text-xs text-slate-700 bg-slate-200 rounded-lg px-2 py-1 mr-1'>
                                    {getRoleName(role)}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <p className='text-xs text-slate-700 truncate text-ellipsis max-w-lg'>{project.description}</p>
            </div>
            <div className="flex gap-3 items-center">
                <div className='flex flex-col items-end'>
                    <div className='text-xs text-slate-600'>Created At</div>
                    <div className='text-xs text-slate-600'>{formatDate(project.createdAt)}</div>
                </div>
                <TooltipProvider>
                    <div className="flex gap-1 items-center">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <div
                                    onClick={handleEditClick}
                                    className='flex cursor-pointer p-2 rounded-lg hover:bg-slate-200 h-full aspect-square'>
                                    <FaPen className='!text-slate-600' />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>View Project</TooltipContent>
                        </Tooltip>
                        <Tooltip>
                            <TooltipTrigger>
                                <div
                                    onClick={handleSettingsClick}
                                    className='flex cursor-pointer p-2 rounded-lg hover:bg-slate-200 h-full aspect-square'>
                                    <FaCog className='!text-slate-600' />
                                </div>
                            </TooltipTrigger>
                            <TooltipContent>Project Settings</TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </div>
        </ListItem>
    )
}

export default ProjectListItem