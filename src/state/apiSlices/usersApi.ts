import { PaginatedResponse, User } from "@/components/feats/admin/UserTable";
import { apiSlice } from "../api";
import { USER_TAG } from "../tags";

export type Domain = {
    _id: string;
    domain: string;
};

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
        addUsers: builder.mutation<any, { name: string, role: string, email: string }[]>({
            query: (users) => ({
                url: `users`,
                method: 'POST',
                body: {
                    users
                },
            }),
            invalidatesTags: [USER_TAG],
        }),

        // domains
        fetchDomains: builder.query<{
            domains: Domain[],
            total: number
        }, { page?: number, pageSize?: number }>({
            query: ({ page, pageSize }) => ({
                url: `users/domains?page=${page || ''}&limit=${pageSize || ''}`,
            }),
            providesTags: [USER_TAG],
        }),
        addDomain: builder.mutation<any, string>({
            query: (domain) => ({
                url: `users/domains`,
                method: 'POST',
                domain
            }),
        }),
        deleteDomain: builder.mutation<any, string>({
            query: (domainId) => ({
                url: `users/domains/${domainId}`,
                method: 'DELETE',
            }),
        }),
    }),
});

export const {
    useFetchUsersQuery,
    useDeleteUserMutation,
    useAddUsersMutation,
    useFetchDomainsQuery,
    useAddDomainMutation,
    useDeleteDomainMutation,
} = usersApiSlice;