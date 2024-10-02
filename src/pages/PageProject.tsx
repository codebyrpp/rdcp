import BreadCrumbs from '@/components/common/BreadCrumbs';
import Loading from '@/components/common/Loading';
import CreateForm from '@/components/feats/forms/CreateForm';
import FormListItem from '@/components/feats/forms/ListItemForm';
import { Badge } from '@/components/ui/badge';
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

    if(isLoading) 
        return <Loading />;

    return (
        <>
            <div className="flex justify-between">

                <div className="flex gap-2 items-center">
                    <BreadCrumbs links={[
                        { name: 'Projects', url: '/projects' },
                    ]} pageName={`Project: ${project.name}`} />
                </div>

                <div className="flex gap-2">
                    <Button variant={"secondary"}
                        size={"icon"}
                        onClick={() => {
                            // navigate to project settings
                            navigateToProjectSettings(projectId!);
                        }}>
                        <FaCog className='text-lg text-slate-800' />
                    </Button>
                    <CreateForm />
                </div>
            </div>
            {/* top */}
            <div className="flex gap-2 justify-end my-2">
                {/* Search and Filter */}
                <Input
                    ref={searchInputRef}
                    placeholder={"Type '/' to search form by name"} className='w-1/4'
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                {/* End of Search and Filter */}

            </div>
            {/* end of top */}

            {/* List of forms */}
            <div className="flex flex-col gap-2">
                {/* <FormListItem form={form} /> */}
                {
                    isLoading ? <Loading/> :
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