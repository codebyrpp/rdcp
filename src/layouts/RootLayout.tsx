import Brand from '@/components/common/Brand'
import { Toaster } from '@/components/ui/toaster'
import { useState } from 'react'
import { Outlet } from 'react-router-dom'

const RootLayout = () => {
    const [isPageLoading, setIsPageLoading] = useState(false)

    return isPageLoading ? (
        <div className='flex flex-col h-screen justify-center items-center'>
            <div className="animate-bounce">
                <Brand />
            </div>
            <h3 className='mt-4 text-2xl font-semibold text-slate-800'>Loading...</h3>
        </div>
    ) : (
        <>
            <Outlet />
            <Toaster />
        </>
    )
}

export default RootLayout