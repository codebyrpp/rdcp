import { Button } from '../ui/button'
import { formatDate } from '@/utils'
import useProjectNavigation from '@/hooks/useProjectNavigation'
import { ProjectDTO } from '@/state/apiSlices/projectsApi'
import { getRoleName } from '@/models/projects'

interface ProjectListItemProps {
    project: ProjectDTO
}

const ProjectListItem = ({ project }: ProjectListItemProps) => {

    const { navigateToProject } = useProjectNavigation()

    return (
        <div className='flex justify-between
     border border-slate-300 
     rounded-xl p-3 bg-slate-100'>
            <div className=''>
                <div className="flex gap-2">
                    <h5 className='text-lg font-bold'>{project.name}</h5>
                    <div className="flex">
                        {project.roles.map((role) => {
                            return (
                                <div key={role}
                                    className='text-sm text-slate-700 bg-slate-200 rounded-lg px-2 py-1 mr-1'>
                                    {getRoleName(role)}
                                </div>
                            )
                        })}
                    </div>
                </div>
                <p className='text-sm text-slate-700 truncate text-ellipsis max-w-sm'>{project.description}</p>

            </div>
            <div className="flex gap-3 items-center">
                <div className='flex flex-col items-end'>
                    <div className='text-sm text-slate-700'>Created At</div>
                    <div className='text-sm text-slate-700'>{formatDate(project.createdAt)}</div>
                </div>
                <Button className='bg-slate-800 hover:bg-slate-900'
                    onClick={() => {
                        navigateToProject(project.id)
                    }}>
                    Open
                </Button>
            </div>
        </div>
    )
}

export default ProjectListItem