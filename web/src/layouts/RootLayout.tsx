import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'
import AuthGuard from './AuthGuard'

const RootLayout = () => {

    return (
        <>
            <Outlet />
            <Toaster />
        </>
    )
}

export default RootLayout