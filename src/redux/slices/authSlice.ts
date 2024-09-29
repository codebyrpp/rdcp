import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '@/models/user';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface AuthState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
}

const initialState: AuthState = {
    user: null,
    accessToken: null,
    refreshToken: null,
};

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setAuth: (state, action: PayloadAction<AuthState>) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;

            // Save session details to AsyncStorage
            AsyncStorage.setItem('user', JSON.stringify(user));
            AsyncStorage.setItem('accessToken', accessToken);
            AsyncStorage.setItem('refreshToken', refreshToken);
        },
        revokeAuth: (state) => {
            state.user = null;
            state.accessToken = null;
            state.refreshToken = null;

            // Remove session details from AsyncStorage
            AsyncStorage.removeItem('user');
            AsyncStorage.removeItem('accessToken');
            AsyncStorage.removeItem('refreshToken');
        },
        refreshAuth: (state, action: PayloadAction<{ accessToken: string }>) => {
            const { accessToken } = action.payload;
            state.accessToken = accessToken;

            // Update accessToken in AsyncStorage
            AsyncStorage.setItem('accessToken', accessToken);
        },
        setInitialAuthState: (state, action: PayloadAction<AuthState>) => {
            const { user, accessToken, refreshToken } = action.payload;
            state.user = user;
            state.accessToken = accessToken;
            state.refreshToken = refreshToken;
        }
    },
});

export const { setAuth, revokeAuth, refreshAuth, setInitialAuthState } = authSlice.actions;

export default authSlice.reducer;

// A function to load the session from AsyncStorage and initialize the Redux state
export const loadAuthFromStorage = () => async (dispatch: any) => {
    const user = await AsyncStorage.getItem('user');
    const accessToken = await AsyncStorage.getItem('accessToken');
    const refreshToken = await AsyncStorage.getItem('refreshToken');

    if (user && accessToken && refreshToken) {
        dispatch(setInitialAuthState({
            user: JSON.parse(user),
            accessToken,
            refreshToken,
        }));
    }
};
