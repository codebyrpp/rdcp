import CreateProject from '@/components/projects/CreateProject'
import ProjectListItem from '@/components/projects/ListItemProject'
import { Input } from '@/components/ui/input'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { cn } from '@/lib/utils'
import { Project, ProjectRole } from '@/models/projects'
import { useProjectsViewModel } from '@/viewmodels/projects/list'
import { useEffect, useState } from 'react'

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

  useEffect(() => {
    console.log(projects);
  }, [projects]);

  return (
    <>
      {/* Top */}
      <div className="flex justify-between mb-2">
        <CreateProject />

        {/* Search and Filter */}
        <div className='flex gap-3 items-center'>
          <Input
            placeholder='Search Projects'
            onChange={(event) => setSearchTerm(event.target.value)}
          />
          <div className="border border-slate-400 rounded-lg bg-slate-50 p-1">
            <ToggleGroup
              variant="outline"
              type="single"
              value={filter}
              onValueChange={handleFilterChange}
            >
              {Object.entries(FILTERS).map(([key, value]) => (
                <ToggleGroupItem
                  key={value}
                  value={value}
                  aria-label={key.charAt(0).toUpperCase() + key.slice(1)}
                  className={cn(filter === value ? "!bg-slate-300" : "")}
                >
                  <span>{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                </ToggleGroupItem>
              ))}
            </ToggleGroup>
          </div>
        </div>
        {/* End of Search and Filter */}
      </div>
      {/* End of Top */}

      {/* Content */}
      <div className="grid grid-cols-2 gap-2">
        {
          isLoading ? (
            <div>Loading...</div>
          ) : isError ? (
            // @ts-ignore
            <div>{error?.data?.message}</div>
          ) : filteredProjects().map((project: Project) => (
            <ProjectListItem key={project.id} project={project} />
          ))
        }
      </div>
    </>
  );
};

export default PageDashboard;
