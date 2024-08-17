import React from 'react'
import { Button } from '../ui/button'

const ProjectListItem = () => {
    return (
        <div className='flex justify-between
     border border-slate-300 
     rounded-xl p-3 bg-slate-100'>
            <div className=''>
                <h5 className='text-lg font-bold'>Project Name</h5>
                <p className='text-sm text-slate-700'>Project Description</p>
            </div>
            <div className="flex gap-3 items-center">
                <div className='flex flex-col items-end'>
                    <div className='text-sm text-slate-700'>Last Accessed</div>
                    <div className='text-sm text-slate-700'>{"{date time}"}</div>
                </div>
                <Button className='bg-slate-800 hover:bg-slate-900'>
                    Open
                </Button>
            </div>
        </div>
    )
}

export default ProjectListItem