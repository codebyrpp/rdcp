import { apiSlice } from "../api";

interface LoginResponseDto {
    message: string;
    success: boolean;
    email: string;
    role: string;
    accessToken: string,
    refreshToken: string
}

const apiBaseDomain = import.meta.env.VITE_APP_API_BASE;

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponseDto, any>({
            query: (body) => ({
                url: `${apiBaseDomain}/v2/auth/login`,
                method: 'POST',
                body,
            }),
        }),
        logout: builder.mutation({
            query: () => ({
                url: 'auth/logout',
                method: 'POST',
            }),
        }),
    }),
});

export const { useLoginMutation, useLogoutMutation } = authApiSlice;