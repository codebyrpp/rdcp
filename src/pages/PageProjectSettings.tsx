import BreadCrumbs from "@/components/common/BreadCrumbs"
import Loading, { PageLoading } from "@/components/common/Loading";
import FormUpdateProjectSettings from "@/components/forms/FormUpdateProjectSettings";
import DeleteProject from "@/components/projects/DeleteProject";
import InviteMembers from "@/components/projects/InviteMembers";
import { Skeleton } from "@/components/ui/skeleton";
import useProjectNavigation from "@/hooks/useProjectNavigation";
import { formatDate } from "@/utils";
import { useProjectInfoViewModel } from "@/viewmodels/projects/single";

const PageProjectSettings = () => {

    const { project: _project, navigateToAllProjects, navigateToProject } = useProjectNavigation();
    const { id: projectId } = _project!;
    const { project, isLoading } = useProjectInfoViewModel({ projectId });

    if (isLoading)
        return <PageLoading />

    return (
        <div className="">
            <div className="flex mb-4">
                <BreadCrumbs links={[
                    {
                        name: 'Projects',
                        action: navigateToAllProjects
                    },
                    {
                        name: `Project: ${project?.name}`,
                        action: () => navigateToProject(_project)
                    },
                ]} pageName={`Settings`} />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 bg-muted p-3 rounded-lg">
                        <p className="text-sm">Project Id: {project?.id}</p>
                        <p className="text-sm">Created At: {formatDate(project?.createdAt ?? "")}</p>
                    </div>
                    {
                        isLoading ? <Skeleton className="h-full w-full" /> :
                            (<>
                                <FormUpdateProjectSettings />
                                <DeleteProject />
                            </>)
                    }
                </div>
                {
                    project?.id ? <InviteMembers projectId={project.id} /> : <Skeleton className="h-full w-full" />
                }
            </div>

        </div>
    )
}

export default PageProjectSettings