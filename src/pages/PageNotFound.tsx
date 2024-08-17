import Brand from '@/components/common/Brand'

const PageNotFound = () => {
    return (
        <div className='flex flex-col justify-between items-center h-screen p-24'>
            <div className="">
                <Brand />
            </div>
            <div className='mt-12 flex flex-col gap-2 justify-center items-center flex-1'>
                <h1 className='text-4xl font-bold'>404 | Page Not Found</h1>
                <p className='text-lg text-slate-600'>The page you are looking for does not exist.</p>
                <a href="/" className='underline text-slate-900'>Return Home</a>
            </div>
        </div>
    )
}

export default PageNotFound