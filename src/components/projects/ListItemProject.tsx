import React from 'react'
import { Button } from '../ui/button'
import { Project } from '@/models/projects'
import { formatDate } from '@/utils'
import { useNavigate } from 'react-router-dom'
import { PROJECT_ROUTE } from '@/constants/routes'

interface ProjectListItemProps {
    project: Project
}

const ProjectListItem = ({project}: ProjectListItemProps) => {

    const navigate = useNavigate()
    const handleOpenProject = () => {
        // Open the project
        const route = PROJECT_ROUTE.replace(':projectId', project.id)
        navigate(route);
    }

    return (
        <div className='flex justify-between
     border border-slate-300 
     rounded-xl p-3 bg-slate-100'>
            <div className=''>
                <h5 className='text-lg font-bold'>{project.name}</h5>
                <p className='text-sm text-slate-700 truncate text-ellipsis max-w-sm'>{project.description}</p>
            </div>
            <div className="flex gap-3 items-center">
                <div className='flex flex-col items-end'>
                    <div className='text-sm text-slate-700'>Created At</div>
                    <div className='text-sm text-slate-700'>{formatDate(project.createdAt)}</div>
                </div>
                <Button className='bg-slate-800 hover:bg-slate-900'
                    onClick={handleOpenProject}>
                    Open
                </Button>
            </div>
        </div>
    )
}

export default ProjectListItem