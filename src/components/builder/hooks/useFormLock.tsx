import { useToast } from '@/components/ui/use-toast';
import { useAcquireLockMutation, useKeepAliveMutation, useReleaseLockMutation } from '@/state/apiSlices/formsApi';
import { useEffect, useState } from 'react';

// Custom hook for form locking logic
const useFormLock = (formId: string, idleTimeout = 5 * 60 * 1000, heartbeatInterval = 30 * 1000) => {
    const [releaseLockMutation] = useReleaseLockMutation(); // RTK mutation hook for releasing the lock
    const [keepAliveMutation] = useKeepAliveMutation(); // RTK mutation hook for sending keep-alive
    const [acquireLockMutation] = useAcquireLockMutation(); // RTK mutation hook for acquiring the lock
    const [lockOwner, setLockOwner] = useState<string | null>(null);
    let idleTimer: NodeJS.Timeout | undefined = undefined;

    // Reset idle timer
    const resetIdleTimer = () => {
        clearTimeout(idleTimer);
        idleTimer = setTimeout(() => {
            releaseLock();
        }, idleTimeout);
    };

    // Send heartbeat to keep the lock alive
    const sendHeartbeat = () => {
        keepAliveMutation({ formId })
            .unwrap()
            .catch((error: any) => {
                console.error('Failed to send heartbeat:', error);
            });
    };

    // Release the lock when idle or on cancel/save
    const releaseLock = () => {
        releaseLockMutation({ formId })
            .unwrap()
            .then(() => {
                console.log('Lock released successfully');
            })
            .catch((error: any) => {
                console.error('Failed to release lock:', error);
            });
    };

    const acquireLock = async () => {
        try {
            const response = await acquireLockMutation({ formId }).unwrap();
            if (!response.success)
                setLockOwner(response.user!);
            return response.success;
        } catch (error) {
            console.error('Failed to acquire lock:', error);
        }
        return false;
    };

    const {toast} = useToast();

    useEffect(() => {

        // First try to acquire the lock
        acquireLock().then((success) => {
            if (!success) {
                toast({
                    title: 'Editing Session in Progress',
                    variant: 'warning',
                    description: `The form is currently locked by ${lockOwner}`,
                });
            }

            // Set up heartbeat interval
            const heartbeat = setInterval(sendHeartbeat, heartbeatInterval);

            // Detect idle behavior
            window.addEventListener('mousemove', resetIdleTimer);
            window.addEventListener('keydown', resetIdleTimer);
            resetIdleTimer(); // Start idle timer

            return () => {
                clearTimeout(idleTimer);
                clearInterval(heartbeat);
                window.removeEventListener('mousemove', resetIdleTimer);
                window.removeEventListener('keydown', resetIdleTimer);
            };
        });

    }, [formId]);

    return { releaseLock };
};

export default useFormLock;
