import { Button } from "@/components/ui/button";
import { HiSaveAs } from "react-icons/hi";
import useDesigner from "../hooks/useDesigner";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa6";

function SaveFormBtn({id}:{id:string}) {

  const { elements } = useDesigner();
  const {toast} = useToast();
  const [loading, startTransition] = useTransition();

  const updateFormContext = () => {
    try{
      const jsonElements = JSON.stringify(elements);
      // save in local storage TODO: save in database
      localStorage.setItem(id, jsonElements);

      // toast success
      toast({
        title: "Form Saved",
        description: "Your form has been saved",
        duration: 5000,
      });
    }
    catch(e){
      toast({
        title: "Error",
        description: "An error occured while saving the form",
        duration: 5000,
      });
    }
  }

  return (
    <Button 
    onClick={()=>{
      startTransition(updateFormContext);
    }}
    disabled={loading}
    variant={"outline"} className="gap-2">
      <HiSaveAs className="h-4 w-4" />
      Save
      {loading && <FaSpinner className="animate-spin h-4 w-4" />}
    </Button>
  );
}

export default SaveFormBtn;
