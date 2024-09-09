import { Button } from "@/components/ui/button";
import useDesigner from "../../hooks/useDesigner";
import { useToast } from "@/components/ui/use-toast";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa6";
import { SaveAll } from "lucide-react";

function SaveFormBtn({ id }: { id: string }) {

  const { elements } = useDesigner();
  const { toast } = useToast();
  const [loading, startTransition] = useTransition();

  const updateFormContext = () => {
    try {
      const jsonElements = JSON.stringify(elements);
      // save in local storage TODO: save in database
      localStorage.setItem(id, jsonElements);
      console.log("Saving form...", id);

      // toast success
      toast({
        title: "Form Saved",
        description: "Your form has been saved",
        duration: 5000,
      });
    }
    catch (e) {
      toast({
        title: "Error",
        description: "An error occured while saving the form",
        duration: 5000,
      });
    }
  }

  return (
    <Button
      onClick={() => {
        startTransition(updateFormContext);
      }}
      disabled={loading}
      className="gap-2">
      Save Changes
      <SaveAll className="h-4 w-4" />
      {loading && <FaSpinner className="animate-spin h-4 w-4" />}
    </Button>
  );
}

export default SaveFormBtn;
