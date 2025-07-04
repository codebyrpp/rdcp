import { useEffect, useState } from 'react';
import { SectionWrapper } from '../common/wrapper';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Button } from '../ui/button';
import { DataTable } from './collaborators/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { FaTimesCircle, FaEllipsisH as MoreHorizontal } from 'react-icons/fa';
import { useFetchParticipantsQuery, useAddParticipantsMutation, useRemoveParticipantMutation } from '../../state/apiSlices/participantsApi';

const dummyParticipants = [
    { email: "participant1@rdcp.com", id: "1" },
    { email: "participant2@rdcp.com", id: "2" },
    { email: "participant3@rdcp.com", id: "3" },
    { email: "participant4@rdcp.com", id: "4" },
];

interface Participant {
    email: string;
    id: string;
}

interface ViewParticipantsProps {
    projectId: string;
    formId: string;
}

const ViewParticipants = ({ projectId, formId }: ViewParticipantsProps) => {
    const [search, setSearch] = useState<string>("");
    const [participants, setParticipants] = useState<Participant[]>([]);
    const [selectedParticipants, setSelectedParticipants] = useState<Participant[]>([]);
    const [tableData, setTableData] = useState<Participant[]>([]);

    const { data: fetchedParticipants = [], refetch } = useFetchParticipantsQuery({ projectId, formId });
    const [addParticipants] = useAddParticipantsMutation();
    const [removeParticipant] = useRemoveParticipantMutation();

    useEffect(() => {
        const storedParticipants = localStorage.getItem('participants');
        if (storedParticipants) {
            setTableData(JSON.parse(storedParticipants));
        } else if (fetchedParticipants.length > 0) {
            setTableData(fetchedParticipants);
        }
    }, [fetchedParticipants]);

    useEffect(() => {
        if (search.length > 0) {
            setParticipants(dummyParticipants.filter((participant) => participant.email.includes(search)));
        } else {
            setParticipants([]);
        }
    }, [search]);

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
                            onClick={async () => {
                                await removeParticipant({ projectId, formId, participantId: row.original.id }).unwrap();
                                const updatedTableData = tableData.filter((c) => c.id !== row.original.id);
                                setTableData(updatedTableData);
                                localStorage.setItem('participants', JSON.stringify(updatedTableData));
                                refetch();
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

    const handleAddParticipant = async () => {
        const newParticipants = selectedParticipants.filter(
            (participant) => !tableData.find((p) => p.id === participant.id)
        );
        const emails = newParticipants.map(p => p.email);
        await addParticipants({ projectId, formId, emails }).unwrap();
        const updatedTableData = [...tableData, ...newParticipants];
        setTableData(updatedTableData);
        localStorage.setItem('participants', JSON.stringify(updatedTableData));
        console.log('New Participants Added:', emails); // Log the new participants' emails
        setSelectedParticipants([]);
        setSearch("");
        refetch();
    };

    const handleSelectParticipant = (participant: Participant) => {
        if (!selectedParticipants.find((c) => c.id === participant.id)) {
            setSelectedParticipants([...selectedParticipants, participant]);
        }
    };

    return (
        <div>
            <SectionWrapper>
                <h4 className="text-lg font-semibold">Participants</h4>
                <p className="text-muted-foreground text-sm">Add participants to the form.</p>
                <div className='mt-2'>
                    <div className="flex items-start gap-2">
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
                                        {participants.map((participant) => (
                                            <CommandItem
                                                key={participant.id}
                                                onSelect={() => handleSelectParticipant(participant)}
                                            >
                                                {participant.email}
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                )}
                            </CommandList>
                        </Command>
                        <Button onClick={handleAddParticipant}> + Add Participants</Button>
                    </div>
                    {/* Display selected participants */}
                    <div className="flex flex-wrap gap-2 mt-2">
                        {selectedParticipants.map((participant) => (
                            <div key={participant.id} className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded">
                                <span className="text-sm">{participant.email}</span>
                                <FaTimesCircle
                                    className="cursor-pointer text-sm"
                                    onClick={() => setSelectedParticipants(selectedParticipants.filter((p) => p.id !== participant.id))}
                                />
                            </div>
                        ))}
                    </div>
                </div>


                {/* Participants List Table */}
                <div className="mt-4">
                    <p className="text-sm font-semibold">Participants List</p>
                    <DataTable
                        columns={columns}
                        data={tableData}
                    />
                </div>
            </SectionWrapper>
        </div>
    );
};

export default ViewParticipants;