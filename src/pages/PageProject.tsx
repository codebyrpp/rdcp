import BreadCrumbs from '@/components/common/BreadCrumbs';
import Loading from '@/components/common/Loading';
import CreateForm from '@/components/feats/forms/CreateForm';
import FormListItem from '@/components/feats/forms/ListItemForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useProjectNavigation from '@/hooks/useProjectNavigation';
import { useSearchRef } from '@/hooks/useSearchRef';
import { Form } from '@/models/forms';
import useProjectViewModel from '@/viewmodels/projects/single';
import { useEffect, useRef, useState } from 'react';
import { FaCog } from 'react-icons/fa';
import { useParams } from 'react-router-dom';

const PageProject = () => {

    const { projectId } = useParams<{ projectId: string }>();
    const { navigateToProjectSettings } = useProjectNavigation();
    const { forms, project, isLoading, isError, error } = useProjectViewModel({ projectId });
    const [searchTerm, setSearchTerm] = useState<string>('');

    const filteredForms = forms?.filter((form: Form) => {
        return form.name.toLowerCase().includes(searchTerm.toLowerCase());
    });

    const searchInputRef = useSearchRef();

    if (isLoading)
        return <Loading />;

    return (
        <div className='flex flex-col gap-3 overflow-hidden'>
            <div className="flex justify-between">

                <div className="flex gap-2 items-center">
                    <BreadCrumbs links={[
                        { name: 'Projects', url: '/projects' },
                    ]} pageName={`Project: ${project.name}`} />
                </div>

                <div className="flex gap-2">
                    {/* Search and Filter */}
                    <Input
                        ref={searchInputRef}
                        placeholder={"Type '/' to search form by name"} className='w-3/4'
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                    {/* End of Search and Filter */}
                    <CreateForm />
                    <Button variant={"secondary"}
                        onClick={() => {
                            // navigate to project settings
                            navigateToProjectSettings(projectId!);
                        }}>
                        Project Settings
                        <FaCog className='ml-2 text-lg text-slate-800' />
                    </Button>
                </div>
            </div>
            {/* List of forms */}
            <div className="flex flex-col gap-2 overflow-y-auto">
                {/* <FormListItem form={form} /> */}
                {
                    isLoading ? <Loading /> :
                        // @ts-ignore
                        isError ? <p>{error?.message}</p> :
                            forms?.length === 0 ? <NoFormsFound /> :
                                filteredForms?.map((form) => {
                                    return <FormListItem
                                        roles={project.roles!}
                                        key={form.id} form={form} />
                                })
                }
            </div>
        </div>
    );
};

const NoFormsFound = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2">
            <p className="text-muted-foreground">No forms found</p>
            <p className="text-muted-foreground mb-3">Create a form to get started</p>
            <CreateForm />
        </div>
    );
}

export default PageProject;