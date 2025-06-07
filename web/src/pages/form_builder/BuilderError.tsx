"use client";

import { useEffect } from 'react';
import { Button } from '@/components/ui/button';

function BuilderError({error}: {error: Error}) {
    useEffect(() => console.error(error), [error]);
  return (<div className='min-h-screen flex flex-col justify-center items-center gap-4'> 
            <h2 className='text-destructive  text-3xl'>Something went wrong!</h2>
            <Button asChild>
                <a href ="/">Go back to home</a>
            </Button>
        </div>);
  
}

export default BuilderError;
