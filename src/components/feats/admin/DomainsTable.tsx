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
import { Domain, useFetchDomainsQuery } from "@/state/apiSlices/usersApi"

export default function DomainsTable() {

    const { data: domainData, isLoading } = useFetchDomainsQuery({})
    const [deleteDomain, setDeleteDomain] = useState<string | null>(null)
    const [domains, setDomains] = useState<Domain[]>([])
    const [totalDomains, setTotalDomains] = useState(0)

    useEffect(() => {
        if (domainData) {
            setDomains(domainData.domains)
            setTotalDomains(domainData.total)
        }
    }, [domainData])

    const handleDeleteDomain = () => {
        if (deleteDomain) {
            // Delete user
        }
    }

    return (
        <div className="space-y-4">
            {/* User Table */}
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead>Domain</TableHead>
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
                    ) : domains.length === 0 ? (
                        <TableRow>
                            <TableCell colSpan={4} className="text-center">No whitelisted domains.</TableCell>
                        </TableRow>
                    ) : (
                        domains.map((domain, index) => (
                            <TableRow key={index} className="py-1">
                                <TableCell className="!py-1">{domain.domain}</TableCell>
                                <TableCell className="!py-1">
                                    <Button variant="destructive" size={"sm"} onClick={() => setDeleteDomain(domain._id)}>
                                        <Trash2 className="h-4 w-4" />
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>

            {/* Delete User Confirmation */}
            <AlertDialog open={!!deleteDomain} onOpenChange={() => setDeleteDomain(null)}>
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
                        <AlertDialogAction onClick={handleDeleteDomain}>Delete</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}
