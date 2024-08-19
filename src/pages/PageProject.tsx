import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PageProject = () => {
    
    const { projectId } = useParams<{ projectId: string }>();
    
    useEffect(() => {
    }, [projectId]);
    
    return (
        <div>
            <h1>Project Page</h1>
            <p>Project ID: {projectId}</p>
        </div>
    );
};

export default PageProject;