import React from 'react'
import { ImSpinner2 } from 'react-icons/im'

const Loading = () => {
    return (
        <div className='h-full w-full flex flex-1 items-center justify-center'>
            <ImSpinner2 className="animate-spin h-12 w-12" />
        </div>
    )
}

export default Loading