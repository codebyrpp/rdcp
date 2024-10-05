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

type LeaveEditorButtonProps = {
  projectId: string;
  saveChanges: () => void;
}

export function LeaveEditorButton({ saveChanges, projectId }: LeaveEditorButtonProps) {
  const [isOpen, setIsOpen] = useState(false)
  const { navigateToProject } = useProjectNavigation();

  const handleLeave = () => {
    navigateToProject(projectId);
  }

  const handleSaveAndLeave = () => {
    saveChanges();
    navigateToProject(projectId);
  }

  return (
    <div>
      <Button variant="secondary" size={"icon"}
        onClick={() => setIsOpen(true)}>
        <X className="h-5 w-5" />
      </Button>
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
              variant="destructive"
              onClick={handleLeave}
            >
              Leave without saving
            </Button>
            <Button
              type="button"
              variant="success"
              onClick={handleSaveAndLeave}
              className='font-bold'
            >
              Save and Exit
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Go Back
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}