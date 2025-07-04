import React, { useCallback, useEffect, useState } from 'react';
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
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription, DialogTrigger } from '../ui/dialog';
import { SectionWrapper } from '../common/wrapper';
import { useAddCollaboratorsMutation, useUpdateCollaboratorRolesMutation, useRemoveCollaboratorMutation, useFetchCollaboratorsQuery } from '@/state/apiSlices/collaboratorsApi';
import useEmailSearch, { UserSuggestion } from '../../../src/hooks/useEmailSearch';

interface InviteCollaboratorsSectionProps {
  emailError: string | null;
  updateInvitesCallback: (invites: UserSuggestion[]) => void;
  selectedInvites: UserSuggestion[];
}

const InviteCollaboratorsSection: React.FC<InviteCollaboratorsSectionProps> = ({
  emailError,
  updateInvitesCallback,
  selectedInvites,
}) => {
  const { suggestions, debouncedFetchSuggestions } = useEmailSearch();
  const [searchText, setSearchText] = useState<string>('');

  const selectSuggestion = (suggestion: UserSuggestion) => {
    // add to selectedSuggestions without duplicates
    if (!selectedInvites.some(s => s.id === suggestion.id)) {
      updateInvitesCallback([...selectedInvites, suggestion]);
    }
    // clear the suggestions
    debouncedFetchSuggestions('');    // clear the search text
    setSearchText('');

  }

  const removeInvitation = (id: string) => {
    updateInvitesCallback(selectedInvites.filter(suggestion => suggestion.id !== id));
  }

  useEffect(() => {
    if (searchText) {
      debouncedFetchSuggestions(searchText);
    }
  }, [searchText, debouncedFetchSuggestions]);

  return (
    <div className="mb-4">
      <Label htmlFor="emails">1. Select Users</Label>
      <p className="text-muted-foreground text-sm">
        Search for existing users in the organization
      </p>
      <div className="flex items-center gap-2 mt-2">
        <Input
          id="emails"
          placeholder="Search users by email address"
          value={searchText || ''}
          onChange={(e) => {
            setSearchText(e.target.value);
            debouncedFetchSuggestions(e.target.value);
          }}
          className="mt-2"
        />
      </div>
      {emailError && <p className="text-red-500 text-sm mt-2">{emailError}</p>}
      {suggestions.length > 0 && (
        <div className="mt-2 bg-white text-sm border border-gray-300 rounded shadow-lg">
          {suggestions.map((suggestion) => (
            <div
              key={suggestion.id}
              className="px-4 py-2 cursor-pointer hover:bg-gray-200"
              onClick={() => selectSuggestion(suggestion)}
            >
              {suggestion.email}
            </div>
          ))}
        </div>
      )}
      <div className="flex flex-wrap gap-2 mt-2">
        {selectedInvites.map((member) => (
          <div key={member.id} className="flex items-center gap-2 bg-gray-200 px-2 py-1 rounded">
            <span className="text-sm">{member.email}</span>
            <FaTimesCircle
              className="cursor-pointer text-sm"
              onClick={() => removeInvitation(member.id)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

interface CollaboratorRolesSectionProps {
  invitedMembers: UserSuggestion[];
  selectedRoles: ProjectRole[];
  handleAddCollaborators: () => void;
  handleRoleChange: (role: ProjectRole) => void;
}

const CollaboratorRolesSection: React.FC<CollaboratorRolesSectionProps> = ({
  invitedMembers,
  selectedRoles,
  handleAddCollaborators,
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
          onClick={handleAddCollaborators}
          disabled={selectedRoles.length === 0}
          className="mt-2"
          variant={"secondary"}
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
    <div className="py-2">
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
  const [emailError, setEmailError] = useState<string | null>(null);
  const [selectedRoles, setSelectedRoles] = useState<ProjectRole[]>([]);
  const [tableData, setTableData] = useState<{ id: string; email: string, roles: string[] }[]>([]);

  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editingEmail, setEditingEmail] = useState<string | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [addCollaborators] = useAddCollaboratorsMutation();
  const [updateCollaboratorRoles] = useUpdateCollaboratorRolesMutation();
  const [removeCollaborator] = useRemoveCollaboratorMutation();

  /// Fetch the existing collaborators
  const { data: collaborators, refetch } = useFetchCollaboratorsQuery({ projectId });
  useEffect(() => {
    if (collaborators) {
      setTableData(collaborators.map(collaborator => ({
        id: collaborator.id,
        email: collaborator.email,
        roles: collaborator.roles
      })));
    }
  }, [collaborators]);

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

  const [invitations, setInvitations] = useState<UserSuggestion[]>([]);
  const updateInvites = useCallback((invites: UserSuggestion[]) => {
    setInvitations(invites);
  }, []);

  const resetForm = () => {
    setInvitations([]);
    setSelectedRoles([]);
    setEmailError(null);
  }


  const handleAddCollaborators = async () => {
    // if no invites, return
    if (invitations.length === 0) return;

    // if no roles selected, return
    if (selectedRoles.length === 0) return;

    // check if invites already exist in table
    const existingEmails = tableData.map((data) => data.email);
    const newEmails = invitations.map((invite) => invite.email);
    const duplicateEmails = newEmails.filter((email) => existingEmails.includes(email));

    if (duplicateEmails.length > 0) {
      setEmailError(`The following email(s) already exist in the list: ${duplicateEmails.join(', ')}`);
      return;
    }

    try {
      await addCollaborators({
        projectId,
        users: invitations,
        roles: selectedRoles
      });
    } catch (err) {
      console.error('Failed to add collaborators:', err);
    }

    // add to table
    const newCollaborators = invitations.map((user, index) => ({
      id: user.id,
      email: user.email,
      roles: selectedRoles as ProjectRole[],
    }));

    setTableData([...tableData, ...newCollaborators]);

    resetForm();

  };


  return (
    <div className='h-[80vh]'>
      <SectionWrapper>
        <div className="flex justify-between">
          <h5 className='text-lg my-2 font-bold'>
            Collaborators
          </h5>
          <Dialog>
            <DialogTrigger asChild>
              <Button variant={"secondary"} className="gap-2">
                Add Collaborators
              </Button>
            </DialogTrigger>

            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add Collaborators</DialogTitle>
                <DialogDescription>
                  Invite collaborators to access all or specific forms in this project.
                </DialogDescription>
              </DialogHeader>
              <InviteCollaboratorsSection
                selectedInvites={invitations}
                emailError={emailError}
                updateInvitesCallback={updateInvites}
              />
              <CollaboratorRolesSection
                invitedMembers={invitations}
                selectedRoles={selectedRoles}
                handleAddCollaborators={handleAddCollaborators}
                handleRoleChange={handleRoleChange}
              />
            </DialogContent>
          </Dialog>
        </div>
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