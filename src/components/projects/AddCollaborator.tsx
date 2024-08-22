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
import { set } from 'react-hook-form';
import { Button } from '../ui/button';
import { FaCross } from 'react-icons/fa6';
import { FaTimesCircle } from 'react-icons/fa';
import { Checkbox } from '../ui/checkbox';
import { getRoleName, getRolePermissions, ProjectRole } from '@/models/projects';

const dummyCollaborators = [
    { email: "user1@rdcp.com", id: "1" },
    { email: "user2@rdcp.com", id: "2" },
];

interface Collaborator {
    email: string;
    id: string;
}

const AddCollaborator = () => {
    const [search, setSearch] = useState<string>("")

    const [collaborators, setCollaborators] = useState<Collaborator[]>([])

    const [selectedCollaborators, setSelectedCollaborators] = useState<Collaborator[]>([])


    useEffect(() => {
        if (search.length > 0) {
            setCollaborators(dummyCollaborators.filter((collaborator) => collaborator.email.includes(search)))
        } else {
            setCollaborators([])
        }
    }, [search])

    return (
        <div>
            <SectionWrapper>
                <h4 className="text-lg font-semibold">Collaborators</h4>
                <p className="text-muted-foreground text-sm">Add  collaborators</p>
                <Command>
                    <CommandInput
                        value={search}
                        onValueChange={(value) => setSearch(value)}
                        placeholder="Search user by email..." />
                    <CommandList>
                        {
                            search.length > 0 && collaborators.length === 0 && <CommandEmpty>
                                No collaborators found.
                            </CommandEmpty>
                        }
                        {
                            collaborators.length > 0 && <CommandGroup heading="Suggestions">
                                {
                                    collaborators.map((collaborator) => (
                                        <CommandItem
                                            key={collaborator.id}
                                            onSelect={() => {
                                                if (!selectedCollaborators.find((c) => c.id === collaborator.id)) {
                                                    setSelectedCollaborators([...selectedCollaborators, collaborator])
                                                }
                                                setSearch("")
                                            }}
                                        >
                                            {collaborator.email}
                                        </CommandItem>
                                    ))
                                }
                            </CommandGroup>
                        }
                    </CommandList>
                </Command>

                <div className="flex flex-wrap gap-2 mt-2">
                    {
                        selectedCollaborators.map((collaborator) => (
                            <div key={collaborator.id} className="flex items-center gap-2">
                                <div className="flex gap-1 bg-slate-200 items-center px-2 py-1 rounded-sm">
                                    <p className='text-sm'>{collaborator.email}</p>
                                    <FaTimesCircle
                                        className='cursor-pointer'
                                        onClick={() => {
                                            setSelectedCollaborators(selectedCollaborators.filter((c) => c.id !== collaborator.id))
                                        }} />
                                </div>
                            </div>
                        ))
                    }
                </div>

                {/* Check the roles  from the checkboxes */}
                <div className='flex flex-col gap-2'>
                    <h4 className="text-lg font-semibold">Roles</h4>
                    <div className="flex flex-col gap-3">
                        {
                            Object.values(ProjectRole).map((role) => (
                                <div
                                    key={role}
                                    className="flex space-x-2">
                                    <Checkbox id={role} />
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
                            ))
                        }
                    </div>
                </div>

            </SectionWrapper>
        </div>
    )
}

export default AddCollaborator