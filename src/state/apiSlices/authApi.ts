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
        })
    }),
});

export const { useLoginMutation } = authApiSlice;