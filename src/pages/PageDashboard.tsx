import CreateProject from '@/components/projects/CreateProject'
import ProjectListItem from '@/components/projects/ListItemProject'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useSearchRef } from '@/hooks/useSearchRef'
import { cn } from '@/lib/utils'
import { Project, ProjectRole } from '@/models/projects'
import { useProjectsViewModel } from '@/viewmodels/projects/list'
import { useState } from 'react'

// Define filter constants
const FILTERS = {
  ALL: 'all',
  OWNED: 'owned',
  COLLABORATING: 'collaborating',
};

const PageDashboard = () => {
  const { projects, isLoading, isError, error } = useProjectsViewModel();
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filter, setFilter] = useState<string>(FILTERS.ALL);

  const handleFilterChange = (value: string) => {
    setFilter(value || FILTERS.ALL);
  };

  const searchRef = useSearchRef();

  const filteredProjects = () => {
    if (!projects) return [];

    return projects.filter((project: Project) => {
      const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());

      switch (filter) {
        case FILTERS.ALL:
          return matchesSearch;
        case FILTERS.OWNED:
          return matchesSearch && project.roles?.includes(ProjectRole.OWNER);
        case FILTERS.COLLABORATING:
          return matchesSearch && !project.roles?.includes(ProjectRole.OWNER);
        default:
          return false;
      }
    });
  };

  return (
    <div className=''>
      {/* Top */}
      {
        projects && projects.length > 0 && (
          <div className='flex justify-between mb-2'>
            <CreateProject />
            {/* Search and Filter */}
            <div className='flex gap-3 items-center'>
              <Input
                ref={searchRef}
                placeholder="Type '/' to search projects"
                onChange={(event) => setSearchTerm(event.target.value)}
              />
              <div className="rounded-lg bg-slate-50 p-1">
                <ToggleGroup
                  className='!border-none'
                  variant="default"
                  type="single"
                  value={filter}
                  onValueChange={handleFilterChange}
                >
                  {Object.entries(FILTERS).map(([key, value]) => (
                    <ToggleGroupItem
                      size={"sm"}
                      key={value}
                      value={value}
                      aria-label={key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}
                      className={cn(filter === value ? "!bg-slate-200" : "")}
                    >
                      <span>{key.charAt(0).toUpperCase() + key.slice(1).toLowerCase()}</span>
                    </ToggleGroupItem>
                  ))}
                </ToggleGroup>
              </div>
            </div>
            {/* End of Search and Filter */}
          </div>)
      }
      {/* End of Top */}

      {/* Content */}
      {
        isLoading ? (
          <div>Loading...</div>
        ) : isError ? (
          // @ts-ignore
          <div>{error?.data?.message}</div>
        ) : (
          projects?.length === 0 ? (
            <div className="w-full flex flex-col items-center gap-2 my-8">
              <p className='text-muted-foreground'>No projects found</p>
              <p className='text-muted-foreground mb-3'>Create a new project to get started</p>
              {
                projects && projects.length == 0 && (
                  <CreateProject />)
              }
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-2">
              {
                filteredProjects().map((project: Project) => (
                  <ProjectListItem key={project.id} project={project} />
                ))
              }
            </div>
          )
        )
      }

    </div>
  );
};

export default PageDashboard;
