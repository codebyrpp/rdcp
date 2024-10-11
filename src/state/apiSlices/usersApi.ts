import { PaginatedResponse, User } from "@/components/feats/admin/UserTable";
import { apiSlice } from "../api";
import { USER_TAG } from "../tags";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchUsers: builder.query<PaginatedResponse, { page: number, pageSize: number, role?: string, email?: string }>({
            query: ({ page, pageSize, role, email }) => ({
                url: `users?page=${page}&limit=${pageSize}&role=${role || ''}&email=${email || ''}`,
            }),
            providesTags: [USER_TAG],
        }),
        deleteUser: builder.mutation<User, string>({
            query: (userId) => ({
                url: `users/${userId}`,
                method: 'DELETE',
            }),
            invalidatesTags: [USER_TAG],
        }),
    }),
});

export const { useFetchUsersQuery, useDeleteUserMutation } = usersApiSlice;