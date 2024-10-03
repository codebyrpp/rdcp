import Brand from '@/components/common/Brand'
import { Button } from '@/components/ui/button';

type BaseErrorPageProps = {
    title: string;
    description: string;
}

const BaseErrorPage = ({ title, description }: BaseErrorPageProps) => {
    return (
        <div className='flex flex-col justify-between items-center h-screen p-24'>
            <div className="">
                <Brand />
            </div>
            <div className='mt-12 flex flex-col gap-2 justify-center items-center flex-1'>
                <h1 className='text-4xl font-bold'>{title}</h1>
                <p className='text-lg text-slate-600'>{description}</p>
                <Button asChild variant={"ghost"}>
                    <button onClick={() => window.history.back()} className='underline text-slate-900'>Go Back</button>
                </Button>
            </div>
        </div>
    )
}

const PageError = () => {
    return <BaseErrorPage title="Something went wrong 😢" description="An error occurred while processing your request." />
}

const PageNotFound = () => {
    return <BaseErrorPage title="404 | Page Not Found" description="The page you are looking for does not exist." />
}

const PageUnAuthorized = () => {
    return <BaseErrorPage title="Unauthorized" description="You are not authorized to view this page." />
}

export { PageError, PageNotFound, PageUnAuthorized }