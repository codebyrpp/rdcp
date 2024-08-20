import BreadCrumbs from '@/components/common/BreadCrumbs';
import CreateForm from '@/components/feats/forms/CreateForm';
import FormListItem from '@/components/feats/forms/ListItemForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useProject from '@/hooks/useProject';
import { Form } from '@/models/forms';
import useProjectViewModel from '@/viewmodels/projects/single';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PageProject = () => {

    const { projectId } = useParams<{ projectId: string }>();
    const { navigateToProjectSettings } = useProject();
    const { forms, project, isLoading, isError, error } = useProjectViewModel({ projectId, withForms: true });
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredForms = forms?.filter((form: Form) => {
        return form.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!projectId) {
            // redirect to the home page
            navigate("/");
        }
    }, [projectId]);

    return (
        <>
            <div className="flex justify-between mb-2">
                
                <BreadCrumbs links={[
                    { name: 'Projects', url: '/projects' },
                ]} pageName={`Project: ${project.name}`} />

                <Button variant={"secondary"} onClick={() => {
                    // navigate to project settings
                    navigateToProjectSettings(projectId!);
                }}>
                    Project Settings
                </Button>
            </div>
            {/* top */}
            <div className="flex justify-between mb-2">
                <CreateForm />
                {/* Search and Filter */}
                <div className='flex gap-3 items-center'>
                    <Input placeholder='Search Form'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                {/* End of Search and Filter */}

            </div>
            {/* end of top */}

            {/* List of forms */}
            <div className="grid grid-cols-1 gap-3">
                {/* <FormListItem form={form} /> */}
                {
                    isLoading ? <p>Loading...</p> :
                        // @ts-ignore
                        isError ? <p>{error?.message}</p> :
                            forms?.length === 0 ? <p className='m-5 text-muted-foreground'>No forms found</p> :
                                filteredForms?.map((form) => {
                                    return <FormListItem
                                        roles={project.roles!}
                                        key={form.id} form={form} />
                                })
                }
            </div>
        </>
    );
};

export default PageProject;