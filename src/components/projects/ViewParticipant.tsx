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
import { Button } from '../ui/button';
import { DataTable } from './collaborators/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { FaEllipsisH as MoreHorizontal } from 'react-icons/fa';
//import { set } from 'react-hook-form';

const dummyParticipants = [
    { email: "participant1@rdcp.com", id: "1" },
    { email: "participant2@rdcp.com", id: "2" },
];

interface Participant {
    email: string;
    id: string;
}

const ViewParticipant = () => {
    const [search, setSearch] = useState<string>("");
    const [showSearchBar, setShowSearchBar] = useState(false);
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
    
    useEffect(() => {
        if (search.length > 0) {
            setParticipants(dummyParticipants.filter((participant) => participant.email.includes(search)))
        } else {
            setParticipants([])
        }
    }, [search])

    const columns: ColumnDef<Participant>[] = [
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
                                setSelectedParticipants(selectedParticipants.filter((c) => c.id !== row.original.id));
                            }}
                        >
                            Remove
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                    </DropdownMenuContent>
                </DropdownMenu>
            ),
        },
    ];

    const handleAddCollaborator = (participant: Participant) => {
        if (!selectedParticipants.find((c) => c.id === participant.id)) {
            setSelectedParticipants([...selectedParticipants, { ...participant}]);
            setSearch("");
        }
    };

    return (
        <div>
            <SectionWrapper>
                <h4 className="text-lg font-semibold">Participants</h4>
                <p className="text-muted-foreground text-sm">Add participants to the form.</p>
                <Button className="btn btn-primary mt-4" onClick={() => setShowSearchBar(!showSearchBar)}>+  Add Participants</Button>
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
                                    {search.length > 0 && participants.length === 0 && (
                                        <CommandEmpty>No participants found.</CommandEmpty>
                                    )}
                                    {participants.length > 0 && (
                                        <CommandGroup heading="Suggestions">
                                            {participants.map((participants) => (
                                                <CommandItem
                                                    key={participants.id}
                                                    onSelect={() => handleAddCollaborator(participants)}
                                                >
                                                    {participants.email}
                                                </CommandItem>
                                            ))}
                                        </CommandGroup>
                                    )}
                                </CommandList>
                            </Command>
                        </div>
                    </div>
                )}

                {/* Collaborator List Table */}
                <div className="mt-4">
                    <p className="text-sm font-semibold"> Collaborators List</p>
                    <DataTable
                        columns={columns}
                        data={selectedParticipants}
                    />
                </div>

                
                
            </SectionWrapper>
        </div>
    )
}

export default ViewParticipant