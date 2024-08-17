import LoginForm from '../components/forms/FormLogin'
import Brand from '@/components/common/Brand'

const LoginPage = () => {
    return <>
        <div className='flex flex-col gap-y-4 h-screen justify-center items-center'>
            <Brand/>
            <LoginForm />
        </div>
    </>
}
export default LoginPage


