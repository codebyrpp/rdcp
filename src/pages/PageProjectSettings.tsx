import BreadCrumbs from "@/components/common/BreadCrumbs"
import FormProjectSettings from "@/components/forms/FormProjectSettings";
import DeleteProject from "@/components/projects/DeleteProject";
import useProjectViewModel from "@/viewmodels/projects/single";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PageProjectSettings = () => {

    const { projectId } = useParams<{ projectId: string }>();
    const navigate = useNavigate();
    const { project } = useProjectViewModel({ projectId });

    useEffect(() => {
        if (!projectId) {
            // redirect to the home page
            navigate("/");
        }
    }, [])

    return (
        <div>
            <div className="flex">
                <BreadCrumbs links={[
                    { name: 'Projects', url: '/projects' },
                    { name: `Project: ${project?.name}`, url: `/projects/${projectId}` },
                ]} pageName={`Project Settings`} />
            </div>

            <div className="grid grid-cols-2">
                <div className="flex flex-col gap-3">
                    {/* <FormProjectSettings /> */}
                    <DeleteProject />
                </div>
            </div>

        </div>
    )
}

export default PageProjectSettings