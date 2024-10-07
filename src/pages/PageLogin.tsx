import { useEffect } from 'react'
import LoginForm from '../components/forms/FormLogin'
import Brand from '@/components/common/Brand'
import useSession from '@/hooks/useSession'
import { PROJECTS_ROUTE } from '@/constants/routes'
import Loading from '@/components/common/Loading'
import { useNavigate } from 'react-router-dom'

const LoginPage = () => {

    const { user } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        // if user is already logged in, redirect to the projects dashboard
        if (user) {
            navigate(PROJECTS_ROUTE);
        }
    }, [])

    return <>
        <div className='flex flex-col gap-y-4 h-screen justify-center items-center' data-testid="login-form">
            <Brand />
            <LoginForm />
        </div>
    </>
}
export default LoginPage


