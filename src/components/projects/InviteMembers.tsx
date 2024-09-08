import React, { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
//import { Select } from '../ui/select';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Label } from '../ui/label';
import { Checkbox } from '../ui/checkbox'; // For the Domain Scoped Roles
import { FaTimesCircle } from 'react-icons/fa';
import { getRoleName, getRolePermissions, ProjectRole } from '@/models/projects'; // Import the roles


const InviteMembers: React.FC = () => {
  // State for the email input
  const [email, setEmail] = useState<string>('');
  // State for the list of invited members
  const [invitedMembers, setInvitedMembers] = useState<string[]>([]);
  const [emailError, setEmailError] = useState<string | null>(null);

  // State for scope and selected domain
  //const [scope, setScope] = useState<string>('All domains');
  //const [selectedDomain, setSelectedDomain] = useState<string>('');

  // State for the selected roles (Domain Scoped Roles)
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  // Dummy list of available domains
  //const availableDomains = ['example.com', 'mywebsite.org', 'designpage.com'];

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
  };

  // Function to handle role selection
  const handleRoleChange = (role: string) => {
    if (selectedRoles.includes(role)) {
      setSelectedRoles(selectedRoles.filter((r) => r !== role));
    } else {
      setSelectedRoles([...selectedRoles, role]);
    }
  };

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

        {/* Scope Section */}
        {/*<div className="mb-4">
          <Label htmlFor="scope" className='text-lg'> 2. Select Scope of Permissions</Label>
          <Select
            onValueChange={setScope}
            defaultValue="All domains"
          >
            <option value="All domains">All domains</option>
            <option value="A specific domain">A specific domain</option>
          </Select>
        */}
          {/* If "A specific domain" is selected, show domain selector */}
          {/*
          {scope === 'A specific domain' && (
            <div className="mt-4">
              <Label htmlFor="domain">Select Domain</Label>
              <Select
                onValueChange={setSelectedDomain}
                defaultValue=""
                //className="mt-2"
              >
                <option value="" disabled>
                  Select domain
                </option>
                {availableDomains.map((domain) => (
                  <option key={domain} value={domain}>
                    {domain}
                  </option>
                ))}
              </Select>
            </div>
          )}
        </div>
        */}
        

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
      </CardContent>
    </Card>
  );
};

export default InviteMembers;
