import useSession from '@/hooks/useSession';
import { ReactNode, useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const AuthGuard = () => {

    const { user } = useSession();
    const navigate = useNavigate();

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
    }, [user, navigate]);

    return (
        <Outlet />
    )
}

export default AuthGuard