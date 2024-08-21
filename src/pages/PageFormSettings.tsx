import BreadCrumbs from "@/components/common/BreadCrumbs"
import DeleteForm from "@/components/feats/forms/DeleteForm"
import FormUpdateFormSettings from "@/components/forms/FormUpdateFormSettings"
import { useParams } from "react-router-dom"

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

            <div className="grid lg:grid-cols-2 mt-2">
                <div className="flex flex-col gap-3 py-2">
                    <div className="flex flex-col gap-1">
                        <p className="text-muted-foreground text-sm">Form Id: {formId}</p>                        
                    </div>
                    <FormUpdateFormSettings />
                    <DeleteForm />
                </div>
            </div>

        </div>
    )
}


export default PageFormSettings