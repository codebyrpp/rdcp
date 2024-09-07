import DesignerContextProvider from "@/components/context/DesignerContext";
import { ReactNode } from "react";


function BuilderLayout({ children }: { children: ReactNode }) {
  return (
    <DesignerContextProvider>
      <div className="flex w-full flex-grow mx-auto">
        {children}
      </div>
    </DesignerContextProvider>
  )
}

export default BuilderLayout