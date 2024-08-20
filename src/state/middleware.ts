import { Middleware } from '@reduxjs/toolkit';
import { isRejectedWithValue } from '@reduxjs/toolkit';
import { revokeSession } from './slices/session';

export const apiErrorMiddleware: Middleware = (store) => (next) => (action) => {
    
    // Check if the action is a rejected action and if the status code is 401
    if (isRejectedWithValue(action)) {
        //  @ts-ignore
        const { status } = action.payload || {};

        if (status === 401) {
            // Dispatch the revokeSession action to log the user out
            store.dispatch(revokeSession());
            // Redirect to the login page
            window.location.href = '/login';
        }
    }

    return next(action);
};
