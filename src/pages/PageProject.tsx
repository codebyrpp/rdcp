import CreateForm from '@/components/feats/forms/CreateForm';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useProject from '@/hooks/useProject';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

const PageProject = () => {

    const { projectId } = useParams<{ projectId: string }>();
    const { navigateToProjectSettings } = useProject();
    const navigate = useNavigate();
    
    useEffect(() => {
        if (!projectId) {
            // redirect to the home page
            navigate("/");
        }
    }, [projectId]);

    return (
        <div className='p-4'>
            <div className="flex justify-between mb-2">
                <h4 className='text-xl font-bold'>
                    {"{Project Name}"}
                </h4>
                <Button variant={"secondary"} onClick={()=>{
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
                    <Input placeholder='Search Form' />
                </div>
                {/* End of Search and Filter */}

            </div>
            {/* end of top */}
        </div>
    );
};

export default PageProject;