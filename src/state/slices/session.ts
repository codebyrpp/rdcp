import Session from "@/models/session";
import User from "@/models/user";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState = {
    user: localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')!) as User : null,
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
};

export const sessionSlice = createSlice({
    name: 'session',
    initialState: initialState,
    reducers: {
        setSession: (state, action: PayloadAction<Session>) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
            localStorage.setItem('user', JSON.stringify(user));
            localStorage.setItem('token', token);
        },
        revokeSession: (state) => {
            state.user = null;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
    },
});

export const { setSession, revokeSession } = sessionSlice.actions;
export default sessionSlice.reducer;