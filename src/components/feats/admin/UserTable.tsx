"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import Loading from "@/components/common/Loading"
import ClearableSelect from "@/components/common/ClearableSelect"
import { useFetchUsersQuery } from "@/state/apiSlices/usersApi"

// This would typically come from your API or database
const ROLES = ["admin", "user"]

export interface User {
    id: string
    name: string
    email: string
    role: string
}

export interface PaginatedResponse {
    users: User[]
    total: number
}

export default function UserTable() {
    // Manage local state for users and filters
    const [users, setUsers] = useState<User[]>([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [pageSize] = useState(10)
    const [roleFilterInput, setRoleFilterInput] = useState<string>()
    const [roleFilter, setRoleFilter] = useState<string>()
    const [emailFilterInput, setEmailFilterInput] = useState<string>()
    const [emailFilter, setEmailFilter] = useState<string>()
    const [isLoading, setIsLoading] = useState(false)
    const [deleteUser, setDeleteUser] = useState<User | null>(null)
    const {
        data: usersData,
        error: usersError,
        isLoading: usersLoading,
        isFetching: usersFetching,
    } = useFetchUsersQuery({ page, pageSize, role: roleFilter, email: emailFilter })

    useEffect(() => {
        setIsLoading(usersLoading || usersFetching)
    }, [usersLoading, usersFetching])

    useEffect(() => {
        console.log(usersData, usersError)
        if (usersData) {
            setUsers(usersData.users ?? [])
            setTotal(usersData.total ?? 0)
        }
    }, [usersData])

    const handlePageChange = (newPage: number) => {
        setPage(newPage) // Local state management
    }

    const handleRoleFilterChange = (role: string) => {
        setRoleFilterInput(role)
    }
    const [roleFilterKey, setRoleFilterKey] = useState(+new Date());

    const handleEmailFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmailFilterInput(event.target.value)
    }

    const handleDeleteUser = async () => {
        if (!deleteUser) return

        try {
            const response = await fetch(`/api/users/${deleteUser.id}`, {
                method: 'DELETE',
            })

            if (!response.ok) throw new Error('Failed to delete user')

            // Remove the user from the local state
            setUsers(users.filter(user => user.id !== deleteUser.id))
            setTotal(prev => prev - 1)
        } catch (error) {
            console.error('Error deleting user:', error)
        } finally {
            setDeleteUser(null)
        }
    }


    const updateFilters = () => {
        setRoleFilter(roleFilterInput)
        setEmailFilter(emailFilterInput)
        setPage(1)
    }
    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex justify-between items-center gap-3">
                <Input
                    placeholder="Filter by email"
                    value={emailFilterInput}
                    onChange={handleEmailFilterChange}
                    className="max-w-sm"
                />
                <ClearableSelect
                    options={ROLES.map(role => ({ key: role, label: role }))}
                    key={roleFilterKey}
                    placeholder="Filter by role"
                    value={roleFilterInput}
                    onValueChange={(value) => {
                        handleRoleFilterChange(value!);
                        setRoleFilterKey(+new Date());
                    }}
                />
                <Button
                    onClick={updateFilters}
                    disabled={isLoading}
                >
                    {isLoading ? "Loading..." : "Apply Filters"}
                </Button>
            </div>

            {/* User Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Role</TableHead>
                        <TableHead>Actions</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {isLoading ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">
                                <Loading />
                            </TableCell>
                        </TableRow>
                    ) : users.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No users found</TableCell>
                        </TableRow>
                    ) : (
                        users.map((user, index) => (
                            <TableRow key={index} className="py-1">
                                <TableCell className="!py-1">{user.name}</TableCell>
                                <TableCell className="!py-1">{user.email}</TableCell>
                                <TableCell className="!py-1">{user.role}</TableCell>
                                <TableCell className="!py-1">
                                    <Button variant="destructive" size={"sm"} onClick={() => setDeleteUser(user)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex justify-between items-center text-sm">
                <div>
                    Showing {((page - 1) * pageSize) + 1} to {Math.min(page * pageSize, total)} of {total} results
                </div>
                <div className="flex items-center space-x-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(page - 1)}
                        disabled={page === 1}
                    >
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <div>Page {page}</div>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={() => handlePageChange(page + 1)}
                        disabled={page * pageSize >= total}
                    >
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Delete User Confirmation */}
            <AlertDialog open={!!deleteUser} onOpenChange={() => setDeleteUser(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure you want to delete this user?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action cannot be undone. This will permanently delete the user
                            account and remove their data from our servers.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={handleDeleteUser}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
