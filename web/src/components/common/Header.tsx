import logo from '@/assets/logo.svg'
import useSession from '@/hooks/useSession'
import {
    DropdownMenu, DropdownMenuTrigger, DropdownMenuContent,
    DropdownMenuSeparator, DropdownMenuGroup,
    DropdownMenuItem
} from '@/components/ui/dropdown-menu'
import { Settings, LogOut } from 'lucide-react'
import { Button } from '../ui/button'
import { FaChevronDown, FaUser } from 'react-icons/fa6'

const Header = () => {

    const { user, logout } = useSession();

    return (
        <div className='flex justify-between p-3 border-b bg-background'>
            <NavBrand />
            <div className=''>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className='flex gap-2'>
                        <FaUser className='text-slate-900' />
                        {user?.email}
                        <FaChevronDown className='text-slate-900' />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">          
                        <DropdownMenuItem onClick={logout}>
                            <LogOut className="mr-2 h-4 w-4" />
                            <span>Log out</span>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

        </div>
    )
}

export default Header


function NavBrand() {
    return <a className='flex gap-3 items-center' href='/'>
        <img src={logo} alt='logo' className='w-8 h-8' />
        <h1 className='text-lg font-bold text-slate-900 tracking-tight'>Research Data Collector Platform</h1>
    </a>
}
