import BreadCrumbs from "@/components/common/BreadCrumbs"
import DeleteForm from "@/components/feats/forms/DeleteForm"
import FormUpdateFormSettings from "@/components/forms/FormUpdateFormSettings"
import { useParams } from "react-router-dom"
import ViewParticipants from "@/components/projects/ViewParticipant";

const PageFormSettings = () => {

    // get projectId and formId from params
    const { projectId } = useParams<{ projectId: string }>()
    const { formId } = useParams<{ formId: string }>()
    
    return (
        <div className="overflow-y-auto">
            <div className="flex mb-4">
                <BreadCrumbs links={[
                    { name: '...', url: '/projects' },
                    { name: "Project", url: `/projects/${projectId}` },
                ]} pageName={`Form Settings - ${"form name"}`} />
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-3">
                    <div className="flex flex-col gap-1 bg-muted p-3 rounded-lg">
                        <p className="text-muted-foreground text-sm">Form Id: {formId}</p>                        
                    </div>
                    <FormUpdateFormSettings />
                    <DeleteForm />
                </div>
                <div className="flex flex-col gap-3">
                    {/* Search and Add Collaborator */}
                    <ViewParticipants/>
                </div>
            </div>

        </div>
    )
}


export default PageFormSettings