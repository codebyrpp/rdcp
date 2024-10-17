'use client'

import { useState } from 'react'
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AlertTriangle, X } from 'lucide-react'
import useProjectNavigation from '@/hooks/useProjectNavigation'
import { ExitIcon } from '@radix-ui/react-icons'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'

type LeaveEditorButtonProps = {
  hasChanges: boolean;
  canSave: boolean;
  projectId: string;
  saveChanges: () => void;
}

export function LeaveEditorButton({
  hasChanges,
  canSave,
  saveChanges,
  projectId }: LeaveEditorButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { project, navigateToProject } = useProjectNavigation();

  const handleLeave = () => {
    navigateToProject(project);
  }

  const handleSaveAndLeave = () => {
    saveChanges();
    navigateToProject(project);
  }

  return (
    <div>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <Button variant="secondary" size={"icon"}
              onClick={() => setIsOpen(true)}>
              <ExitIcon />
            </Button>
          </TooltipTrigger>
          <TooltipContent sideOffset={5}>
            <span>Leave Designer</span>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Leaving Designer
            </DialogTitle>
            <DialogDescription>
              You might have unsaved changes. Are you sure you want to leave?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="warning"
              onClick={handleLeave}
            >
              {canSave && hasChanges ? 'Leave without saving' : 'Leave'}
            </Button>
            {
              canSave && hasChanges && <Button
                type="button"
                variant="success"
                onClick={handleSaveAndLeave}
                className='font-bold'
              >
                Save and Exit
              </Button>
            }
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Don't Leave
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}