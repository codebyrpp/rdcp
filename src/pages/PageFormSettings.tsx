import BreadCrumbs from "@/components/common/BreadCrumbs"
import DeleteForm from "@/components/feats/forms/DeleteForm"
import FormUpdateFormSettings from "@/components/forms/FormUpdateFormSettings"
import { useParams } from "react-router-dom"
import ViewParticipant from "@/components/projects/ViewParticipant";

const PageFormSettings = () => {

    // get projectId and formId from params
    const { projectId } = useParams<{ projectId: string }>()
    const { formId } = useParams<{ formId: string }>()
    
    return (
        <div>
            <div className="flex">
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
                    <ViewParticipant/>
                </div>
            </div>

        </div>
    )
}


export default PageFormSettings