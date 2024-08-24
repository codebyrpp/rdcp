import { useEffect } from 'react'
import LoginForm from '../components/forms/FormLogin'
import Brand from '@/components/common/Brand'
import useSession from '@/hooks/useSession'
import { PROJECTS_ROUTE } from '@/constants/routes'

const LoginPage = () => {

    const { user } = useSession();

    useEffect(() => {
        // if user is already logged in, redirect to the projects dashboard
        if (user) {
            window.location.href = PROJECTS_ROUTE;
        }
    }, [])

    return <>
        <div className='flex flex-col gap-y-4 h-screen justify-center items-center'>
            <Brand />
            <LoginForm />
        </div>
    </>
}
export default LoginPage


