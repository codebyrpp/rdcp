import logo from '@/assets/logo.svg'

export default function Brand() {
    return <div className='flex justify-center gap-3 items-center'>
        <img src={logo} alt='logo' className='w-16 h-16' />
        <h1 className='text-4xl font-bold text-slate-900 text-balance w-80'>Research Data Collector Platform</h1>
    </div>
}