import { PaginatedResponse, User } from "@/components/feats/admin/UserTable";
import { apiSlice } from "../api";
import { USER_TAG } from "../tags";

export const usersApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        fetchUsers: builder.query<PaginatedResponse, { page: number, pageSize: number, role?: string, name?: string }>({
            query: ({ page, pageSize, role, name }) => ({
                url: `users?page=${page}&pageSize=${pageSize}&role=${role || ''}&name=${name || ''}`,
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