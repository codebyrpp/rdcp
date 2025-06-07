import Header from '../components/common/Header'
import { Outlet } from 'react-router-dom'
import { PageWrapper } from '@/components/common/wrapper'

const AppLayout = () => {

  return (
    <>
      <Header />
      <PageWrapper>
        <Outlet />
      </PageWrapper>
    </>
  )
}

export default AppLayout