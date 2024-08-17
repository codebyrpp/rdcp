import ProjectListItem from '@/components/projects/ListItemProject'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { FaPlus } from 'react-icons/fa6'

const PageDashboard = () => {
  return (
    <div className='p-4'>
      {/* top */}
      <div className="flex justify-between mb-2">
        <Button className='flex gap-2 bg-slate-800 text-slate-100 hover:bg-slate-900'>
          New Project
          <FaPlus className='text-lg' />
        </Button>
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
      </div>
      {/* content */}
      <div className="grid grid-cols-2 gap-2">
        <ProjectListItem />
        <ProjectListItem />
      </div>
    </div>
  )
}

export default PageDashboard