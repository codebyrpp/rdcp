import useSession from '@/hooks/useSession';
import { ReactNode, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const AuthGuard = ({ children }: { children: ReactNode }) => {

    const { user } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <>{
            children
        }</>
    )
}

export default AuthGuard