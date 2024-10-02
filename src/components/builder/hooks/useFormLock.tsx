import { useToast } from '@/components/ui/use-toast';
import { useAcquireLockMutation, useKeepAliveMutation, useReleaseLockMutation } from '@/state/apiSlices/formsApi';
import { useEffect, useState } from 'react';

// Custom hook for form locking logic
const useFormLock = (
    formId: string,
    idleTimeout = 10 * 60 * 1000, // 10 minutes
    heartbeatInterval = 2 * 60 * 1000 // 2 minutes
) => {
    const [releaseLockMutation] = useReleaseLockMutation(); // RTK mutation hook for releasing the lock
    const [keepAliveMutation] = useKeepAliveMutation(); // RTK mutation hook for sending keep-alive
    const [acquireLockMutation] = useAcquireLockMutation(); // RTK mutation hook for acquiring the lock

    const [lockInfo, setLockInfo] = useState<{ locked: boolean; owner: string | null }>({
        locked: false, 
        owner: null 
    });

    let idleTimer: NodeJS.Timeout | undefined = undefined;

    const getLockInfo = () => lockInfo;

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
                setLockInfo({ locked: false, owner: null });
            })
            .catch((error: any) => {
                console.error('Failed to release lock:', error);
            });
    };

    // Try to acquire the lock
    const acquireLock = async () => {
        try {
            const response = await acquireLockMutation({ formId }).unwrap();
            if (!response.success) {
                // Another user has the lock
                setLockInfo({ locked: true, owner: response.user! });
                return {
                    locked: true,
                    owner: response.user!,
                };
            }
            // Current user has successfully acquired the lock
            setLockInfo({ locked: false, owner: null });
            return {
                locked: false,
                owner: null,
            };
        } catch (error) {
            console.error('Failed to acquire lock:', error);
        }
        return {
            locked: false,
            owner: null,
        };
    };

    const { toast } = useToast();

    useEffect(() => {
        // First try to acquire the lock
        acquireLock().then((res) => {
            const { locked, owner } = res;

            if (locked) {
                toast({
                    title: 'Editing Session in Progress',
                    variant: 'warning',
                    description: `The form is currently locked by ${owner}`,
                });

                // if the lock is not acquired,  no need to setup heartbeat and idle timer
                return;
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

    return { releaseLock, getLockInfo };
};

export default useFormLock;
