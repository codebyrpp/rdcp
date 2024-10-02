import React, { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox'; 
import { FaTimesCircle } from 'react-icons/fa';
import { getRoleName, getRolePermissions, ProjectRole } from '@/models/projects'; 
import { DataTable } from './collaborators/data-table';
import { ColumnDef } from '@tanstack/react-table';
import { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuLabel, DropdownMenuItem, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { FaEllipsisH as MoreHorizontal } from 'react-icons/fa';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../ui/dialog';
import { SectionWrapper } from '../common/wrapper';
import { useAddCollaboratorsMutation, useUpdateCollaboratorRolesMutation, useRemoveCollaboratorMutation, useFetchCollaboratorsQuery } from '@/state/apiSlices/collaboratorsApi';

interface InviteCollaboratorsSectionProps {
  emails: string;
  setEmails: (emails: string) => void;
  invitedMembers: string[];
  setInvitedMembers: (members: string[]) => void;
  emailError: string | null;
  setEmailError: (error: string | null) => void;
  suggestions: string[];
  handleAddEmails: () => void;
  handleRemoveEmail: (email: string) => void;
}

const InviteCollaboratorsSection: React.FC<InviteCollaboratorsSectionProps> = ({
  emails,
  setEmails,
  invitedMembers,
  setInvitedMembers,
  emailError,
  setEmailError,
  suggestions,
  handleAddEmails,
  handleRemoveEmail,
}) => (
  <div className="mb-4">
    <Label htmlFor="emails">1. Invite Collaborators</Label>
    <p className="text-muted-foreground text-sm">
      Invite collaborators to access all or specific forms in this project.
    </p>
    <div className="flex items-center gap-2 mt-2">
      <Input
        id="emails"
        placeholder="Enter email addresses separated by commas"
        value={emails}
        onChange={(e) => setEmails(e.target.value)}
        className="mt-2"
      />
      <Button onClick={handleAddEmails} className="mt-2">
        + Add Email
      </Button>
    </div>
    {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
    {suggestions.length > 0 && (
      <div className="mt-2 bg-white text-sm border border-gray-300 rounded shadow-lg">
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            className="px-4 py-2 cursor-pointer hover:bg-gray-200"
            onClick={() => setEmails(suggestion)}
          >
            {suggestion}
          </div>
        ))}
      </div>
    )}
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
  </div>
);

interface CollaboratorRolesSectionProps {
  invitedMembers: string[];
  selectedRoles: ProjectRole[];
  setSelectedRoles: (roles: ProjectRole[]) => void;
  handleAddToTable: () => void;
  handleRoleChange: (role: ProjectRole) => void;
}

const CollaboratorRolesSection: React.FC<CollaboratorRolesSectionProps> = ({
  invitedMembers,
  selectedRoles,
  setSelectedRoles,
  handleAddToTable,
  handleRoleChange,
}) => {

  return (
    <div>
      <div className={`${invitedMembers.length === 0 ? 'opacity-50 pointer-events-none' : ''}`}>
        <Label className="mb-4">2. Collaborator Roles</Label>
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
      <div className="mt-4">
        <Button
          onClick={handleAddToTable}
          disabled={selectedRoles.length === 0}
          className="mt-2"
        >
          + Add Collaborators
        </Button>
      </div>
    </div>
  );
};

interface CollaboratorsListSectionProps {
  columns: ColumnDef<{ id: string; email: string; roles: string[] }>[];
  tableData: { id: string; email: string; roles: string[] }[];
  isEditing: boolean;
  setIsEditing: (isEditing: boolean) => void;
  editingEmail: string | null;
  selectedRoles: ProjectRole[];
  setSelectedRoles: (roles: ProjectRole[]) => void;
  handleSaveRoles: () => void;
  handleRoleChange: (role: ProjectRole) => void;
}

const CollaboratorsListSection: React.FC<CollaboratorsListSectionProps> = ({
  columns,
  tableData,
  isEditing,
  setIsEditing,
  editingEmail,
  selectedRoles,
  setSelectedRoles,
  handleSaveRoles,
  handleRoleChange,
}) => (
  <div>
    <div className="mt-4">
      <p className="text-sm font-semibold">Invited Collaborators List</p>
      <DataTable columns={columns} data={tableData} />
    </div>
    {isEditing && (
      <Dialog open={isEditing} onOpenChange={setIsEditing}>
        <DialogContent aria-describedby="edit-roles-description">
          <DialogHeader>
            <DialogTitle>Edit Roles for {editingEmail}</DialogTitle>
            <p id="edit-roles-description" className="text-sm text-muted-foreground">
              Select the roles you want to assign to the collaborator.
            </p>
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
  </div>
);

interface InviteMembersProps {
  projectId: string;
}

const InviteMembers: React.FC<InviteMembersProps> = ({ projectId }) => {
  const [emails, setEmails] = useState<string>('');  
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<ProjectRole[]>([]);
  const [tableData, setTableData] = useState<{ id: string; email: string, roles: string[] }[]>([]);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[]>([]);

  const [addCollaborators] = useAddCollaboratorsMutation();
  const [updateCollaboratorRoles] = useUpdateCollaboratorRolesMutation();
  const [removeCollaborator] = useRemoveCollaboratorMutation();
  const { data: collaborators, refetch } = useFetchCollaboratorsQuery({ projectId });

  const dummyCollaborators = [
    { email: "user1@rdcp.com", id: "1", roles: ['owner'] },
    { email: "user2@rdcp.com", id: "2", roles: ['editor'] },
    { email: "user3@rdcp.com", id: "3", roles: ['viewer'] },
    { email: "user4@rdcp.com", id: "4", roles: ['editor'] },
  ];

  useEffect(() => {
    if (collaborators) {
      setTableData(collaborators.map(collaborator => ({
        id: collaborator.id,
        email: collaborator.email,
        roles: collaborator.roles
      })));
    }
  }, [collaborators]);

  const validateEmail = (email: string) => {
    const regex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    return regex.test(email);
  };

  const handleAddEmails = () => {
    const emailList = emails.split(',').map(email => email.trim());
    const invalidEmails = emailList.filter(email => !validateEmail(email));
    if (invalidEmails.length > 0) {
      setEmailError(`Invalid email(s): ${invalidEmails.join(', ')}`);
      return;
    }

    const newInvitedMembers = emailList.filter(email => !invitedMembers.includes(email));
    setInvitedMembers([...invitedMembers, ...newInvitedMembers]);
    setEmails(''); // Clear the input after adding
    setEmailError(null); // Clear any previous error
  };

  const handleAddToTable = async () => {
    const emailList = invitedMembers.filter(email => validateEmail(email));
    if (emailList.length > 0 && selectedRoles.length > 0) {
      try {
        const newCollaborators = emailList.map((email, index) => ({
          id: (tableData.length + index + 1).toString(),  
          email,
          roles: selectedRoles as ProjectRole[],
        }));
        
        try {
          await addCollaborators({
            projectId,
            emails: emailList,
            roles: selectedRoles,
          }).unwrap();
        } catch (err) {
          console.error("Failed to add collaborators:", err);
        }

        setTableData([...tableData, ...newCollaborators]);
        console.log('New Collaborators Added:', newCollaborators); 
        setInvitedMembers([]); 
        setSelectedRoles([]); 
        setEmailError(null); 
        refetch();
      } catch (error) {
        console.error("Failed to add collaborators:", error);
        setEmailError('Failed to add collaborators.');
      }
    } else {
      if (emailList.length === 0) {
        setEmailError('Please enter valid email addresses.');
      } else if (selectedRoles.length === 0) {
        setEmailError('Please select at least one role.');
      }
    }
  };

  const handleRemoveEmail = async (idToRemove: string) => {
    try {
      const collaborator = tableData.find(data => data.id === idToRemove);
      if (collaborator) {
        await removeCollaborator({
          projectId,
          collaboratorId: collaborator.id,
        }).unwrap();
  
        setTableData(tableData.filter((data) => data.id !== idToRemove));
        refetch();
      }
    } catch (error) {
      console.error("Failed to remove collaborator:", error);
      setEmailError('Failed to remove collaborator.');
    }
  };

  const handleRoleChange = (role: string) => {
    setSelectedRoles((prevSelectedRoles) =>
      prevSelectedRoles.includes(role as ProjectRole)
        ? prevSelectedRoles.filter((r) => r !== role)
        : [...prevSelectedRoles, role as ProjectRole]
    );
  };

  const handleEditRoles = (id: string, email: string) => {
    const collaborator = tableData.find((data) => data.id === id);
    if (collaborator) {
      const rolesAsProjectRoles = collaborator.roles.map(role => role as ProjectRole);
      setSelectedRoles(rolesAsProjectRoles);
      setEditingEmail(email);
      setEditingId(id); 
      setIsEditing(true);
    }
  };

  const handleSaveRoles = async () => {
    try {
      if (editingId) {
        await updateCollaboratorRoles({
          projectId,
          collaboratorId: editingId,
          roles: selectedRoles,
        }).unwrap();

        setTableData(prevTableData =>
          prevTableData.map(data =>
            data.id === editingId ? { ...data, roles: selectedRoles } : data
          )
        );
      }
      setIsEditing(false);
      setEditingEmail(null);
      setEditingId(null);
      setSelectedRoles([]);
      refetch();
    } catch (error) {
      console.error("Failed to update collaborator roles:", error);
      setEmailError('Failed to update collaborator roles.');
    }
  };

  useEffect(() => {
    if (emails.length > 0) {
      const filteredSuggestions = dummyCollaborators
        .filter(collaborator => collaborator.email.includes(emails))
        .map(collaborator => collaborator.email);
      setSuggestions(filteredSuggestions);
    } else {
      setSuggestions([]);
    }
  }, [emails]);

  const columns: ColumnDef<{ id: string; email: string; roles: string[] }>[] = [
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
              onClick={() => handleRemoveEmail(row.original.id)}
            >
              Remove
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={() => handleEditRoles(row.original.id, row.original.email)}
            >
              Update
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      ),
    },
  ];

  return (
    <div className='h-[80vh]'>
      <SectionWrapper>
        <h5 className='text-lg my-2 font-bold'>
          Collaborators
        </h5>
        <InviteCollaboratorsSection
          emails={emails}
          setEmails={setEmails}
          invitedMembers={invitedMembers}
          setInvitedMembers={setInvitedMembers}
          emailError={emailError}
          setEmailError={setEmailError}
          suggestions={suggestions}
          handleAddEmails={handleAddEmails}
          handleRemoveEmail={handleRemoveEmail}
        />
        <CollaboratorRolesSection
          invitedMembers={invitedMembers}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
          handleAddToTable={handleAddToTable}
          handleRoleChange={handleRoleChange}
        />
        <CollaboratorsListSection
          columns={columns}
          tableData={tableData}
          isEditing={isEditing}
          setIsEditing={setIsEditing}
          editingEmail={editingEmail}
          selectedRoles={selectedRoles}
          setSelectedRoles={setSelectedRoles}
          handleSaveRoles={handleSaveRoles}
          handleRoleChange={handleRoleChange}
        />
      </SectionWrapper>
    </div>
  );
};

export default InviteMembers;