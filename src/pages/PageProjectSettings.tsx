import BreadCrumbs from "@/components/common/BreadCrumbs"
import FormUpdateProjectSettings from "@/components/forms/FormUpdateProjectSettings";
import AddCollaborator from "@/components/projects/AddCollaborator";
import DeleteProject from "@/components/projects/DeleteProject";
import InviteMembers from "@/components/projects/InviteMembers";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/utils";
import { useProjectInfoViewModel } from "@/viewmodels/projects/single";
import { useParams } from "react-router-dom";

const PageProjectSettings = () => {

    const { projectId } = useParams<{ projectId: string }>()
    const { project, isLoading } = useProjectInfoViewModel({ projectId });

    return (
        <div className="container mx-auto p-4">
            <div className="flex mb-4">
                <BreadCrumbs links={[
                    { name: 'Projects', url: '/projects' },
                    { name: `Project: ${project?.name}`, url: `/projects/${projectId}` },
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
                
                <div className="flex flex-col gap-3">
                    {/* Search and Add Collaborator */}
                    <div>
                        <AddCollaborator />
                    </div>
                    {/* Invite Members */}
                    <div>
                        <InviteMembers />
                    </div>
                </div>
                
            </div>

        </div>
    )
}

export default PageProjectSettings