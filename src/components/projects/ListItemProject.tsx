import { Button } from '../ui/button'
import { formatDate } from '@/utils'
import useProjectNavigation from '@/hooks/useProjectNavigation'
import { ProjectDTO } from '@/state/apiSlices/projectsApi'
import { getRoleName } from '@/models/projects'
import { FaCog } from 'react-icons/fa'
import { FaPen } from 'react-icons/fa6'

interface ProjectListItemProps {
    project: ProjectDTO
}

const ProjectListItem = ({ project }: ProjectListItemProps) => {

    const { navigateToProject, navigateToProjectSettings } = useProjectNavigation()

    return (
        <div className='flex justify-between
     border border-slate-50 
     hover:border-slate-300
     hover:elevation-2 hover:shadow-sm
     rounded-xl p-2 bg-slate-50 cursor-pointer'
            onClick={() => {
                navigateToProject(project.id)
            }}
        >
            <div className='px-2 flex flex-col gap-1'>
                <div className="flex gap-2 items-center">
                    <h5 className='font-semibold'>{project.name}</h5>
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
                <div className="flex gap-1 items-center">
                    <div
                        onClick={() => {
                            navigateToProject(project.id)
                        }}
                        className='flex cursor-pointer p-2 rounded-lg hover:bg-slate-200 h-full aspect-square'>
                        <FaPen className='!text-slate-600' />
                    </div>
                    <div
                        onClick={() => {
                            navigateToProjectSettings(project.id)
                        }}
                        className='flex cursor-pointer p-2 rounded-lg hover:bg-slate-200 h-full aspect-square'>
                        <FaCog className='!text-slate-600' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProjectListItem