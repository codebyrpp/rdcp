import { apiSlice } from "../api";
import { FORM_TAG, PROJECT_TAG } from "../tags";

interface LoginResponseDto {
    message: string;
    success: boolean;
    email: string;
    role: string;
    accessToken: string,
    refreshToken: string
}

type AccountSetupRequest = {
    email: string;
    otp: string;
    password: string;
}

type ResetPasswordRequest = AccountSetupRequest;

const apiBaseDomain = import.meta.env.VITE_APP_API_BASE;

export const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        login: builder.mutation<LoginResponseDto, any>({
            query: (body) => ({
                url: `${apiBaseDomain}/v2/auth/login`,
                method: 'POST',
                body,
                invalidatesTags: [PROJECT_TAG, FORM_TAG],
            }),
        }),
        accountSetup: builder.mutation<any, any>({
            query: ({ email }) => ({
                url: `auth/register?email=${email}`,
                method: 'GET',
            }),
        }),
        accountSetupVerify: builder.mutation<any, AccountSetupRequest>({
            query: (body) => ({
                url: `auth/register`,
                method: 'POST',
                body,
            }),
        }),
        forgotPassword: builder.mutation<any, any>({
            query: ({ email }) => ({
                url: `auth/reset-password?email=${email}`,
                method: 'GET',
            }),
        }),
        resetPassword: builder.mutation<any, ResetPasswordRequest>({
            query: (body) => ({
                url: `auth/reset-password`,
                method: 'POST',
                body,
            }),
        }),
    }),
});

export const {
    useLoginMutation,
    useAccountSetupMutation,
    useAccountSetupVerifyMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
} = authApiSlice;