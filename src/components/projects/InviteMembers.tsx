import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
//import { Select } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox'; // For the Domain Scoped Roles
import { FaTimesCircle } from 'react-icons/fa';
import { getRoleName, getRolePermissions, ProjectRole } from '@/models/projects'; // Import the roles
import { DataTable } from './collaborators/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { FaEllipsisH as MoreHorizontal } from 'react-icons/fa';

const InviteMembers: React.FC = () => {

  const [email, setEmail] = useState<string>('');
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [tableData, setTableData] = useState<{ email: string, roles: string[] }[]>([]);

  // Function to validate email
  const validateEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  // Function to handle adding a new email
  const handleAddEmail = () => {
    if (email && validateEmail(email)) {
      if (!invitedMembers.includes(email)) {
        setInvitedMembers([...invitedMembers, email]);
        setTableData([...tableData, { email, roles: selectedRoles }]);
        setEmail(''); // Clear the input after adding
        setEmailError(null); // Clear any previous error
      }
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  // Function to handle removing an email
  const handleRemoveEmail = (emailToRemove: string) => {
    setInvitedMembers(invitedMembers.filter((email) => email !== emailToRemove));
    setTableData(tableData.filter((data) => data.email !== emailToRemove));
  };

  // Function to handle role selection
  const handleRoleChange = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

  // Define columns for DataTable
  const columns: ColumnDef<{ email: string; roles: string[] }>[] = [
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
              onClick={() => handleRemoveEmail(row.original.email)}
            >
              Remove
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => {
                // Optionally handle updating collaborators' roles here
              }}
            >
              Update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];


  return (
    <Card className="p-4">
      <CardHeader>
        <CardTitle> Invite Members</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Invite Members Section */}
        <div className="mb-4">
          <Label htmlFor="email" className='text-lg'> 1. Invite members</Label>
          <p  className="text-muted-foreground text-sm">Invite members to access all or spacific forms in this project.</p>
          <div className="flex items-center gap-2 mt-2">
            <Input
                id="email"
                placeholder="Enter email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2"
            />
            <Button onClick={handleAddEmail} className="mt-2">
                Add
            </Button>
            </div>
            {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
        </div>

        {/* Display invited members */}
         <div className="flex flex-wrap gap-2 mt-2">
          {invitedMembers.map((member) => (
            <div key={member} className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded mb-4">
              <span className="text-sm">{member}</span>
              <FaTimesCircle
                className="cursor-pointer text-sm"
                onClick={() => handleRemoveEmail(member)}
              />
            </div>
          ))}
        </div>

        {/* Collaborator Roles Section */}
        <div className="mt-6">
          <Label className='text-lg mb-4'> 2. Collaborator Roles</Label>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.values(ProjectRole).map((role) => (
              <div key={role} className="flex  space-x-2">
                <Checkbox
                  checked={selectedRoles.includes(role)}
                  onCheckedChange={() => handleRoleChange(role)}
                />
                <div>
                    <span className='text-sm'>{getRoleName(role)}</span>
                    <p className='text-xs font-medium text-muted-foreground'>
                    {getRolePermissions(role)}
                    </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Collaborators List Table */}
        <div className="mt-4">
          <p className="text-sm font-semibold">Invited Members List</p>
          <DataTable columns={columns} data={tableData} />
        </div>
        
      </CardContent>
    </Card>
  );
};

export default InviteMembers;
