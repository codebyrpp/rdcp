import Session from "@/models/session";
import User from "@/models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) as User : null,
    accessToken: localStorage.getItem('accessToken') || null,
    refreshToken: localStorage.getItem('refreshToken') || null,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState: initialState,
    reducers: {
        setSession: (state, action: PayloadAction<Session>) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('accessToken', accessToken);
            localStorage.setItem('refreshToken', refreshToken);
        },
        revokeSession: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;
            localStorage.removeItem('user');
            localStorage.removeItem('accessToken');
            localStorage.removeItem('refreshToken');
        },
        refreshSession: (state, action: PayloadAction<{ accessToken: string }>) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;
            localStorage.setItem('accessToken', accessToken);
        }
    },
});

export const { setSession, revokeSession, refreshSession } = sessionSlice.actions;
export default sessionSlice.reducer;