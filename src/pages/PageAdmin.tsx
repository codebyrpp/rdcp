import { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { toast } from "@/components/ui/use-toast";
import { Upload, Globe, UserPlus, X } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import axios from "axios"; // For making API calls to the backend.
import FormWrapper from "@/components/forms/FormWrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import Loading from "@/components/common/Loading";
import useSession from "@/hooks/useSession";
import UserTable from "@/components/feats/admin/UserTable";
import { Domain, useAddDomainMutation, useAddUsersMutation, useDeleteDomainMutation, useFetchDomainsQuery } from "@/state/apiSlices/usersApi";
import DomainsTable from "@/components/feats/admin/DomainsTable";
import { remove } from "lodash";

// Define validation schema using zod
const UserSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["user", "admin"]),
});

type NewUser = z.infer<typeof UserSchema>;

export default function AdminPage() {

  const [whitelist, setWhitelist] = useState<Domain[]>([]);
  const [newWhitelist, setNewWhitelist] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize react-hook-form with zod resolver
  const form = useForm<NewUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "user",
    },
  });

  const [addUsers, { isLoading: isAddingUsers, }] = useAddUsersMutation();
  const handleManualEntry = async (data: NewUser) => {
    try {

      await addUsers([data]).unwrap();

      toast({
        title: "User Added",
        description: `${data.email} has been added successfully.`,
        variant: "success",
      });
      form.reset();
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to add user.",
        variant: "destructive",
      });
    }
  };


  const [bulkUsers, setBulkUsers] = useState<NewUser[]>([]);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const lines = content.split("\n");
        // Remove first line if it's a header
        if (isValidEmail(lines[0])) lines.shift();
        const newUsers = lines
          .map((line) => line.trim().split(","))
          .filter((email) => isValidEmail(email[1]))
          .map((user) => ({ name: user[0], email: user[1], role: "user" as const }));
        setBulkUsers(newUsers);
      };
      reader.readAsText(file);
    }
  };

  const { data: domainData, isLoading } = useFetchDomainsQuery({})
  const [domains, setDomains] = useState<Domain[]>([]);
  const [totalDomains, setTotalDomains] = useState(0);

  useEffect(() => {
      if (domainData) {
          setWhitelist(domainData.domains)
          setTotalDomains(domainData.total)
      }
  }, [domainData])

  const [addDomain, { isLoading: addingDomain }] = useAddDomainMutation();
  const [deleteDomain, ] = useDeleteDomainMutation();

  const handleWhitelistAdd = () => {
    if (newWhitelist) {
      addDomain(newWhitelist).then(() => {
        toast({
          title: "Domain Whitelisted",
          description: `${newWhitelist} has been added to the whitelist.`,
        });
      });
    }
  };

  const handleWhitelistRemove = (domainId: string) => {
    toast({
      title: "Domain Removed",
      description: `${domainId} has been removed from the whitelist.`,
    });
    deleteDomain(domainId);
  };

  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  return (
    <div className="">
      <Tabs defaultValue="users">
        <TabsList>
          <TabsTrigger value="users">Manage Users</TabsTrigger>
          <TabsTrigger value="whitelist">Domain Whitelist</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <div className="flex gap-2">
            <div className="flex flex-col flex-1 gap-2 w-1/2 max-h-[80vh] overflow-y-auto">
              <FormWrapper
                title="Add New User"
                description="Manually add a new user to the system."
              >
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(handleManualEntry)}
                    className="space-y-2"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Name</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter user's name"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Email</FormLabel>
                          <FormControl>
                            <Input
                              placeholder="Enter user's email"
                              type="email"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="role"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Role</FormLabel>
                          <Select
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="user">User</SelectItem>
                              <SelectItem value="admin">Admin</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <Button className="flex" type="submit" disabled={isAddingUsers}>
                      <UserPlus className="mr-2 h-4 w-4" /> Add User
                    </Button>
                  </form>
                </Form>
              </FormWrapper>

              <FormWrapper
                title="Bulk Upload"
                description="Upload a CSV, or TXT file with the format [Name, Email] to add multiple users."
              >
                <Input
                  type="file"
                  accept=".csv, .txt"
                  ref={fileInputRef}
                  onChange={handleFileUpload}
                  className="hidden"
                />
                <Button onClick={() => fileInputRef.current?.click()}>
                  <Upload className="mr-2 h-4 w-4" /> Upload File
                </Button>
                <div className="space-y-2 mt-2">
                  {bulkUsers.map((user, index) => (
                    <div key={index} className="flex items-center justify-between bg-slate-100 text-sm p-2 rounded">
                      {/* Name and Email */}
                      <span>{user.name} ({user.email})</span>
                      {/* Remove Button */}
                      <Button
                        onClick={() => setBulkUsers(bulkUsers.filter((u) => u.email !== user.email))}
                        variant="ghost" size="sm">
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              </FormWrapper>
            </div>
            <div className="flex-1 w-1/2">
              <FormWrapper
                title="Users List"
                description="View and manage existing users."
              >
                <UserTable />
              </FormWrapper>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="whitelist">
          <div className="flex gap-2">
            <div className="flex flex-col flex-1 gap-2">
              <FormWrapper
                title="Domain Whitelist"
                description="Manage the list of whitelisted domains."
              >
                <div className="space-y-4">
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Enter domain (e.g., example.com)"
                      value={newWhitelist}
                      onChange={(e) => setNewWhitelist(e.target.value)}
                    />
                    <Button onClick={handleWhitelistAdd}>
                      <Globe className="mr-2 h-4 w-4" /> Add Domain
                    </Button>
                  </div>
                  <div className="space-y-2">
                    {whitelist.map((domain, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between bg-secondary p-2 rounded"
                      >
                        <span>{domain.domain}</span>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleWhitelistRemove(domain._id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </FormWrapper>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
