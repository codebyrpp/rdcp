import { Button } from '@/components/ui/button';
import { AiOutlineClose } from 'react-icons/ai'; 
import useDesigner from '../hooks/useDesigner';
import { FormElements } from './FormElements';

function PropertiesFormSidebar() {
    const {selectedElement, setSelectedElement} = useDesigner();
    if (!selectedElement) return null;

    const PropertiesForm = FormElements[selectedElement?.type].propertiesComponent;
  return (
    <div className='flex flex-col'>
        <div className='flex justify-between items-center'>
            <p className='text-sm text-foreground/70'>Element Properties</p>
            <Button 
            size={"icon"}
            variant={"ghost"}
            onClick={() => {
                setSelectedElement(null);
            }}>
                <AiOutlineClose/>
            </Button>
        </div>
        <PropertiesForm elementInstance={selectedElement}/>
    </div>
  );
}

export default PropertiesFormSidebar;
