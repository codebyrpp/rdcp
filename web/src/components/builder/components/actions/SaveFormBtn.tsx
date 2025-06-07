import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { FaSpinner } from "react-icons/fa6";
import { SaveAll } from "lucide-react";

type SaveFormBtnProps = {
  canSave: boolean;
  action: () => void;
};

function SaveFormBtn({ action, canSave }: SaveFormBtnProps) {

  const [loading, startTransition] = useTransition();

  return (
    <Button
      onClick={() => {
        startTransition(action);
      }}
      variant={"success"}
      disabled={loading || !canSave}
      className="gap-2">
      Save Changes
      {loading ? <FaSpinner className="animate-spin h-4 w-4" />
        : <SaveAll className="h-4 w-4" />}
    </Button>
  );
}

export default SaveFormBtn;
