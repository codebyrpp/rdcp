import { useEffect, useState } from 'react'
import { SectionWrapper } from '../common/wrapper'
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command"

//import { FaTimesCircle } from 'react-icons/fa';
import { Checkbox } from '../ui/checkbox';
import { getRoleName, getRolePermissions, ProjectRole } from '@/models/projects';
import { Button } from '../ui/button';
import { DataTable } from './collaborators/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { FaEllipsisH as MoreHorizontal } from 'react-icons/fa';
//import { set } from 'react-hook-form';

const dummyCollaborators = [
    { email: "user1@rdcp.com", id: "1" , roles: ['owner'] },
    { email: "user2@rdcp.com", id: "2" , roles: ['editor']},
];

interface Collaborator {
    email: string;
    id: string;
    roles: string[];
}

const AddCollaborator = () => {
    const [search, setSearch] = useState<string>("");
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [collaborators, setCollaborators] = useState<Collaborator[]>([]);
    const [selectedCollaborators, setSelectedCollaborators] = useState<Collaborator[]>([]);
    const [updatingCollaborator, setUpdatingCollaborator] = useState<Collaborator | null>(null);
    const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
    const [showRolesDropdown, setShowRolesDropdown] = useState(true);

    useEffect(() => {
        if (search.length > 0) {
            setCollaborators(dummyCollaborators.filter((collaborator) => collaborator.email.includes(search)))
        } else {
            setCollaborators([])
        }
    }, [search])

    const columns: ColumnDef<Collaborator>[] = [
        {
            accessorKey: 'email',
            header: 'Email',
        },
        {
            accessorKey: 'actions',
            header: 'Actions',
            cell: ({ row }) => (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => {
                                setSelectedCollaborators(selectedCollaborators.filter((c) => c.id !== row.original.id));
                            }}
                        >
                            Remove
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={() => {
                                setUpdatingCollaborator(row.original);
                            }}
                        >
                            Update
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const handleRoleChange = (role: string) => {
        if (selectedRoles.includes(role)) {
            setSelectedRoles(selectedRoles.filter((r) => r !== role));
        } else {
            setSelectedRoles([...selectedRoles, role]);
        }
    };

    const handleAddCollaborator = (collaborator: Collaborator) => {
        if (!selectedCollaborators.find((c) => c.id === collaborator.id)) {
            setSelectedCollaborators([...selectedCollaborators, { ...collaborator, roles: selectedRoles }]);
            setSearch("");
            setSelectedRoles([]);
            setShowRolesDropdown(false); 
        }
    };

    const handleUpdateSubmit = () => {
        if (updatingCollaborator) {
            setSelectedCollaborators((prev) =>
                prev.map((collaborator) =>
                    collaborator.id === updatingCollaborator.id ? updatingCollaborator : collaborator
                )
            );
            setUpdatingCollaborator(null);
        }
    };

    return (
        <div>
            <SectionWrapper>
                <h4 className="text-lg font-semibold">Collaborators</h4>
                <p className="text-muted-foreground text-sm">Add  collaborators to the project.</p>
                <Button className="btn btn-primary mt-4" onClick={() => setShowSearchBar(!showSearchBar)}>+  Add Collaborators</Button>
                {showSearchBar && (
                    <div className='mt-4'>
                        <div className="flex items-center gap-2">
                            <Command>
                                <CommandInput
                                    value={search}
                                    onValueChange={(value) => setSearch(value)}
                                    placeholder="Search user by email..."
                                />
                                <CommandList>
                                    {search.length > 0 && collaborators.length === 0 && (
                                        <CommandEmpty>No collaborators found.</CommandEmpty>
                                    )}
                                    {collaborators.length > 0 && (
                                        <CommandGroup heading="Suggestions">
                                            {collaborators.map((collaborator) => (
                                                <CommandItem
                                                    key={collaborator.id}
                                                    onSelect={() => handleAddCollaborator(collaborator)}
                                                >
                                                    {collaborator.email}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    )}
                                </CommandList>
                            </Command>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <Button className="btn btn-secondary" onClick={() => setShowRolesDropdown(!showRolesDropdown)}>Select Roles</Button>
                                </DropdownMenuTrigger>
                                {showRolesDropdown && (
                                    <DropdownMenuContent align="start">
                                        <DropdownMenuLabel>Select Roles</DropdownMenuLabel>
                                        {Object.values(ProjectRole).map((role) => (
                                            <DropdownMenuItem key={role} onClick={() => handleRoleChange(role)}>
                                                <Checkbox
                                                    id={role}
                                                    checked={selectedRoles.includes(role)}
                                                    onChange={() => handleRoleChange(role)}
                                                />
                                                <label htmlFor={role} className="ml-2">
                                                    {getRoleName(role)}
                                                </label>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                )}
                            </DropdownMenu>
                            <Button className="btn btn-primary" onClick={() => handleAddCollaborator(collaborators[0])}>Add</Button>
                        </div>
                    </div>
                )}

                {/* Collaborator List Table */}
                <div className="mt-4">
                    <p className="text-sm font-semibold"> Collaborators List</p>
                    <DataTable
                        columns={columns}
                        data={selectedCollaborators}
                    />
                </div>

                {/* Update Collaborator Roles */}
                {updatingCollaborator && (
                    <div className="mt-4">
                        <h4 className="text-lg font-semibold">Update Roles for {updatingCollaborator.email}</h4>
                        <div className="flex flex-col gap-3">
                            {Object.values(ProjectRole).map((role) => (
                                <div key={role} className="flex space-x-2 mb-4">
                                    <Checkbox
                                        id={role}
                                        checked={updatingCollaborator.roles.includes(role)}
                                        onChange={() => handleRoleChange(role)}
                                    />
                                    <label
                                        htmlFor={role}
                                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        {getRoleName(role)}
                                        <p className='text-xs font-medium text-muted-foreground'>
                                            {getRolePermissions(role)}
                                        </p>
                                    </label>
                                </div>
                            ))}
                        </div>
                        <Button className="mt-2" onClick={handleUpdateSubmit}>Submit</Button>
                    </div>
                )}

                
            </SectionWrapper>
        </div>
    )
}

export default AddCollaborator