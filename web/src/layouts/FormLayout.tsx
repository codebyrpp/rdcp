import DesignerContextProvider from '@/components/builder/context/DesignerContext'
import { Outlet } from 'react-router-dom'

const FormLayout = () => {
    return (
        <DesignerContextProvider>
            <Outlet />
        </DesignerContextProvider>
    )
}

export default FormLayout