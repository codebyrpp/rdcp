import Brand from '@/components/common/Brand'
import { Button } from '@/components/ui/button';
import { useEffect } from 'react'

const PageError = () => {
    return (
        <div className='flex flex-col justify-between items-center h-screen p-24'>
            <div className="">
                <Brand />
            </div>
            <div className='mt-12 flex flex-col gap-2 justify-center items-center flex-1'>
                <h1 className='text-4xl font-bold'>Something went wrong 😢</h1>
                <p className='text-lg text-slate-500 text-center'>
                    An error occurred while processing your request. <br />
                    Go back and try again.
                </p>
                <Button asChild variant={"ghost"}>
                    <button onClick={() => window.history.back()} className='underline text-slate-900'>Go Back</button>
                </Button>
            </div>
        </div>
    )
}

export default PageError