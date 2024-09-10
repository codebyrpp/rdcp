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

export default function DiscardChangesButton() {
  const [isOpen, setIsOpen] = useState(false)

  const handleDiscard = () => {
    setIsOpen(false)
    // Add your discard logic here
    console.log("Changes discarded")
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
              Confirm Discard
            </DialogTitle>
            <DialogDescription>
              All changes will be lost. This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="sm:justify-start">
            <Button
              type="button"
              variant="destructive"
              onClick={handleDiscard}
            >
              Discard Changes
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancel
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}