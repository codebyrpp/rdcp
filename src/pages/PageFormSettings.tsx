import BreadCrumbs from "@/components/common/BreadCrumbs"
import DeleteForm from "@/components/feats/forms/DeleteForm"
import FormUpdateFormSettings from "@/components/forms/FormUpdateFormSettings"
import { useParams } from "react-router-dom"
import ViewParticipants from "@/components/projects/ViewParticipant";
import useProjectNavigation from "@/hooks/useProjectNavigation";
import { Project } from "@/models/projects";
import { Form } from "@/models/forms";

const PageFormSettings = () => {

    // get projectId and formId from params
    const { project, form } = useProjectNavigation();
    const { id: projectId, } = project as Project;
    const { id: formId, name: formName } = form as Form;

    return (
        <div className="overflow-y-auto">
            <div className="flex mb-4">
                <BreadCrumbs links={[
                    { name: '...', url: '/projects' },
                    { name: "Project", url: `/projects/${projectId}` },
                ]} pageName={`Form Settings - ${formName}`} />
                {/* TODO: Update the form name from router state */}
            </div>

            <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-3">
                    <FormUpdateFormSettings id={formId} />
                    <DeleteForm />
                </div>
                <div className="flex flex-col gap-3">
                    {projectId && formId && <ViewParticipants projectId={projectId} formId={formId} />}
                </div>
            </div>

        </div>
    )
}


export default PageFormSettings