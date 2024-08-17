import logo from '@/assets/logo.svg'
import { FaGear } from 'react-icons/fa6'
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip'
import { FaSignOutAlt } from 'react-icons/fa'
import useSession from '@/hooks/useSession'

const Header = () => {

    const { user, logout } = useSession();

    return (
        <div className='flex justify-between p-3 border-b bg-background'>
            <NavBrand />
            <div className='flex items-center gap-4'>
                <div className='text-sm text-slate-900'>Logged in as {user?.email}</div>
                <TooltipProvider>
                    <div className='flex gap-4'>
                        {/* Settings Icon with tooltip*/}
                        <Tooltip>
                            <TooltipTrigger><FaGear className='text-slate-700 text-xl' /></TooltipTrigger>
                            <TooltipContent>
                                Settings
                            </TooltipContent>
                        </Tooltip>
                        {/* Logout icon with tooltip */}
                        <Tooltip>
                            <TooltipTrigger onClick={logout}>
                                <FaSignOutAlt className='text-slate-700 text-xl' />
                            </TooltipTrigger>
                            <TooltipContent>
                                Logout
                            </TooltipContent>
                        </Tooltip>
                    </div>
                </TooltipProvider>
            </div>

        </div>
    )
}

export default Header


function NavBrand() {
    return <div className='flex gap-3 items-center'>
        <img src={logo} alt='logo' className='w-8 h-8' />
        <h1 className='text-lg font-bold text-slate-900 tracking-tight'>Research Data Collector Platform</h1>
    </div>
}
