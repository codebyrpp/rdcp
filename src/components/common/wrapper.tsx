import React from 'react'

export const PageWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='p-5'>
            {children}
        </div>
    )
}

export const SectionWrapper = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="bg-slate-50 px-4 py-2 rounded-lg max-h-full overflow-auto">
            {children}
        </div>
    )
}
