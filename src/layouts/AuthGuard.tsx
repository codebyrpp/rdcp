import { PageLoading } from '@/components/common/Loading';
import useSession from '@/hooks/useSession';
import { ReactNode, useEffect, useState } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const AuthGuard = () => {

    const { user } = useSession();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user) {
            navigate('/login');
        }
        setLoading(false);
    }, [user, navigate]);

    if (loading) {
        return <PageLoading />
    }

    return (
        <Outlet />
    )
}

export const AdminGuard = () => {
    const { user } = useSession();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!user || user.role !== 'admin') {
            navigate('/');
        }
        setLoading(false);
    }, [user, navigate]);

    if (loading) {
        return <PageLoading />
    }

    return (
        <Outlet />
    )
}

export default AuthGuard