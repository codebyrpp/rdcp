import { apiSlice } from "../api";

interface LoginResponseDto {
    message: string;
    success: boolean;
    email: string;
    role: string;
    accessToken: string,
    refreshToken: string
}

interface LoginResponseDto {
    message: string;
    success: boolean;
    email: string;
    role: string;
    accessToken: string,
    refreshToken: string
}

const API_DOMAIN = process.env.API_DOMAIN || 'http://localhost:3000';

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponseDto, any>({
            query: (body) => ({
                url: `${API_DOMAIN}/v2/auth/login`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const { useLoginMutation } = authApiSlice;
