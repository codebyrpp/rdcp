import CreateProject from '@/components/projects/CreateProject'
import ProjectListItem from '@/components/projects/ListItemProject'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useProjectsViewModel } from '@/viewmodels/projects/list'
import { useEffect } from 'react'
import { FaPlus } from 'react-icons/fa6'

const PageDashboard = () => {

  const { projects, isLoading, isError, error } = useProjectsViewModel();
  
  useEffect(() => {
    console.log(projects)
  }, [projects])

  return (
    <div className='p-4'>
      {/* top */}
      <div className="flex justify-between mb-2">
        <CreateProject/>

        {/* Search and Filter */}
        <div className='flex gap-3 items-center'>
          <Input placeholder='Search Projects' />
          <div className="border border-slate-400 rounded-lg bg-slate-50 p-1">
            <ToggleGroup variant="outline" type="multiple">
              <ToggleGroupItem value="all" aria-label="Toggle bold" className="bg-slate-200">
                <span>All</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="owned" aria-label="Toggle italic">
                <span>Owned</span>
              </ToggleGroupItem>
              <ToggleGroupItem value="collaborating" aria-label="Toggle underline">
                <span>Collaborating</span>
              </ToggleGroupItem>
            </ToggleGroup>
          </div>
        </div>
        {/* End of Search and Filter */}

      </div>
      {/* end of top */}
      
      {/* content */}
      <div className="grid grid-cols-2 gap-2">
        {
          isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            // @ts-ignore
            <div>{error?.data?.message}</div>
          ) : projects.map((project: any) => (
            <ProjectListItem key={project.id} project={project} />
          ))
        }
        
      </div>
    </div>
  )
}

export default PageDashboard