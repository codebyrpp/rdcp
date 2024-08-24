import { DialogClose } from "@radix-ui/react-dialog";
import { ReactNode } from "react";

export const dialogCloseWrapper = (child:ReactNode)=>(
    <DialogClose asChild>
        {child}
    </DialogClose>
) 