import { useEffect } from 'react'
import Header from '../components/common/Header'
import { Outlet, useNavigate } from 'react-router-dom'
import useSession from '@/hooks/useSession'

const AppLayout = () => {

  const { user } = useSession();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/login');
    }
  }, [user, navigate]);

  return (
    <>
      <Header />
      <Outlet />
    </>
  )
}

export default AppLayout