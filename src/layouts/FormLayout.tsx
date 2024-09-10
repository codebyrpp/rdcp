import DesignerContextProvider from '@/components/context/DesignerContext'
import { Outlet } from 'react-router-dom'

const FormLayout = () => {
    return (
        <DesignerContextProvider>
            <Outlet />
        </DesignerContextProvider>
    )
}

export default FormLayout