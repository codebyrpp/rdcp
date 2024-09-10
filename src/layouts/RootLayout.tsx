import { Toaster } from '@/components/ui/toaster'
import { Outlet } from 'react-router-dom'
import AuthGuard from './AuthGuard'

const RootLayout = () => {

    return (
        <AuthGuard>
            <Outlet />
            <Toaster />
        </AuthGuard>
    )
}

export default RootLayout