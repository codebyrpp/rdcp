import BreadCrumbs from "@/components/common/BreadCrumbs"
import FormUpdateProjectSettings from "@/components/forms/FormUpdateProjectSettings";
import DeleteProject from "@/components/projects/DeleteProject";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils";
import { useProjectInfoViewModel } from "@/viewmodels/projects/single";
import { useParams } from "react-router-dom";

const PageProjectSettings = () => {

    const { projectId } = useParams<{ projectId: string }>()
    const { project, isLoading } = useProjectInfoViewModel({ projectId });

    return (
        <div>
            <div className="flex">
                <BreadCrumbs links={[
                    { name: 'Projects', url: '/projects' },
                    { name: `Project: ${project?.name}`, url: `/projects/${projectId}` },
                ]} pageName={`Settings`} />
            </div>

            <div className="grid grid-cols-2 mt-2">
                <div className="flex flex-col gap-3 py-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-muted-foreground text-sm">Project Id: {project?.id}</p>
                        <p className="text-muted-foreground text-sm">Created At: {formatDate(project?.createdAt ?? "")}</p>
                    </div>
                    {
                        isLoading ? <Skeleton className="h-full w-full" /> :
                            (<>
                                <FormUpdateProjectSettings />
                                <DeleteProject />
                            </>)
                    }
                </div>
            </div>

        </div>
    )
}

export default PageProjectSettings