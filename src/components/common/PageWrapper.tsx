import React from 'react'

const PageWrapper = ({children}: {children: React.ReactNode}) => {
    return (
        <div className='p-5'>
            {children}
        </div>
    )
}

export default PageWrapper