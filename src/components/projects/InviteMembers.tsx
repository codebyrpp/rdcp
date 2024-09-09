import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox'; // For the Domain Scoped Roles
import { FaTimesCircle } from 'react-icons/fa';
import { getRoleName, getRolePermissions, ProjectRole } from '@/models/projects'; // Import the roles
import { DataTable } from './collaborators/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { FaEllipsisH as MoreHorizontal } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';

const InviteMembers: React.FC = () => {
  const [email, setEmail] = useState<string>('');  // Main email state
  const [tempEmail, setTempEmail] = useState<string>(''); // Temporary email for input field
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const [tableData, setTableData] = useState<{ email: string, roles: string[] }[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);

  // Validate the email format
  const validateEmail = (email: string) => {
    const regex =  /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  // Handle adding email after validation
  const handleAddEmail = () => {
    if (tempEmail && validateEmail(tempEmail)) {
      if (!invitedMembers.includes(tempEmail)) {
        setInvitedMembers([...invitedMembers, tempEmail]);
        setEmail(tempEmail); // Set the main email when the button is clicked
        setTempEmail(''); // Clear the input after adding
        setEmailError(null); // Clear any previous error
      } else {
        setEmailError('This email is already invited.');
      }
    } else {
      setEmailError('Please enter a valid email address.');
    }
  };

  const handleAddToTable = () => {
    if (validateEmail(email) && selectedRoles.length > 0) {
      setTableData([...tableData, { email, roles: selectedRoles }]);
      setEmail(''); // Clear the email input
      setSelectedRoles([]); // Clear the selected roles
      setEmailError(null); // Clear any error
    } else {
      // Set the error message based on what's wrong (email or roles)
      if (!validateEmail(email)) {
        setEmailError('Please enter a valid email address.');
      } else if (selectedRoles.length === 0) {
        setEmailError('Please select at least one role.');
      }
    }
  };

  // Remove email from invited list and table
  const handleRemoveEmail = (emailToRemove: string) => {
    setInvitedMembers(invitedMembers.filter((email) => email !== emailToRemove));
    setTableData(tableData.filter((data) => data.email !== emailToRemove));
  };

  // Handle role selection (checkbox changes)
  const handleRoleChange = (role: string) => {
    setSelectedRoles((prevSelectedRoles) =>
      prevSelectedRoles.includes(role)
        ? prevSelectedRoles.filter((r) => r !== role)
        : [...prevSelectedRoles, role]
    );
  };

  // Handle opening the edit dialog
  const handleEditRoles = (email: string) => {
    const collaborator = tableData.find((data) => data.email === email);
    if (collaborator) {
      setSelectedRoles(collaborator.roles);
      setEditingEmail(email);
      setIsEditing(true);
    }
  };

  // Handle saving the edited roles
  const handleSaveRoles = () => {
    setTableData((prevTableData) =>
      prevTableData.map((data) =>
        data.email === editingEmail ? { ...data, roles: selectedRoles } : data
      )
    );
    setIsEditing(false);
    setEditingEmail(null);
    setSelectedRoles([]);
  };

  // Define columns for DataTable
  const columns: ColumnDef<{ email: string; roles: string[] }>[] = [
    {
      accessorKey: 'email',
      header: 'Email',
    },
    {
      accessorKey: 'roles',
      header: 'Roles',
      cell: ({ row }) => <span>{row.original.roles.map(role => getRoleName(role as ProjectRole)).join(', ')}</span>,
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
              onClick={() => handleEditRoles(row.original.email)}
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
        <CardTitle>Invite Collaborators</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Invite Collaborators Section */}
        <div className="mb-4">
          <Label htmlFor="email" className="text-lg">1. Invite Collaborators</Label>
          <p className="text-muted-foreground text-sm">
            Invite collaborators to access all or specific forms in this project.
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Input
              id="email"
              placeholder="Enter email address"
              value={tempEmail}
              onChange={(e) => setTempEmail(e.target.value)} // Update tempEmail on input
              className="mt-2"
            />
            <Button onClick={handleAddEmail} className="mt-2">
              + Add Email
            </Button>
          </div>
          {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
        </div>

        {/* Display invited members */}
        <div className="flex flex-wrap gap-2 mt-2">
          {invitedMembers.map((member) => (
            <div key={member} className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded">
              <span className="text-sm">{member}</span>
              <FaTimesCircle
                className="cursor-pointer text-sm"
                onClick={() => handleRemoveEmail(member)}
              />
            </div>
          ))}
        </div>

        {/* Collaborator Roles Section */}
        <div className={`mt-6 ${invitedMembers.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
          <Label className="text-lg mb-4">2. Collaborator Roles</Label>
          <p className="text-muted-foreground text-sm mb-6">
            Select the roles to be assigned for the collaborator /collaborators.
          </p>
          <div className="grid grid-cols-2 gap-2 mt-2">
            {Object.values(ProjectRole).map((role) => (
              <div key={role} className="flex space-x-2">
                <Checkbox
                  checked={selectedRoles.includes(role)}
                  onCheckedChange={() => handleRoleChange(role)}
                />
                <div>
                  <span className="text-sm">{getRoleName(role)}</span>
                  <p className="text-xs font-medium text-muted-foreground">
                    {getRolePermissions(role)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Add to Table Button */}
        <div className="mt-4">
          <Button
            onClick={handleAddToTable}
            disabled={ selectedRoles.length === 0}
            className="mt-2"
          >
             + Add Collaborator
          </Button>
        </div>

        {/* Collaborators List Table */}
        <div className="mt-4">
          <p className="text-sm font-semibold">Invited Collaborators List</p>
          <DataTable columns={columns} data={tableData} />
        </div>
      </CardContent>

      {/* Edit Roles Dialog */}
      {isEditing && (
        <Dialog open={isEditing} onOpenChange={setIsEditing}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Roles for {editingEmail}</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-2 mt-2">
              {Object.values(ProjectRole).map((role) => (
                <div key={role} className="flex space-x-2">
                  <Checkbox
                    checked={selectedRoles.includes(role)}
                    onCheckedChange={() => handleRoleChange(role)}
                  />
                  <div>
                    <span className="text-sm">{getRoleName(role)}</span>
                    <p className="text-xs font-medium text-muted-foreground">
                      {getRolePermissions(role)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <DialogFooter>
              <Button onClick={() => setIsEditing(false)} variant="ghost">
                Cancel
              </Button>
              <Button onClick={handleSaveRoles}>
                Save
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      )}
    </Card>
  );
};

export default InviteMembers;