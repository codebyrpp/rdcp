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

// Define validation schema using zod
const UserSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
  role: z.enum(["user", "admin"]),
});

type NewUser = z.infer<typeof UserSchema>;

export default function AdminPage() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { user } = useSession();
  
  useEffect(() => {
    if (!user || user.role !== "admin") {
      // Redirect to home page if not logged in or not an admin
      window.location.href = "/";
    }
    setIsLoading(false);
  }, [])

  const [whitelist, setWhitelist] = useState<string[]>([]);
  const [newWhitelist, setNewWhitelist] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Initialize react-hook-form with zod resolver
  const form = useForm<NewUser>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      email: "",
      role: "user",
    },
  });

  const handleManualEntry = async (data: NewUser) => {
    if (isWhitelisted(data.email)) {
      try {
        await axios.post("/api/admin/add-user", data);
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
    } else {
      toast({
        title: "Invalid Input",
        description:
          "Please enter a valid email address from an allowed domain.",
        variant: "destructive",
      });
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = async (e) => {
        const content = e.target?.result as string;
        const lines = content.split("\n");
        const newUsers = lines
          .map((line) => line.trim())
          .filter((email) => isValidEmail(email) && isWhitelisted(email))
          .map((email) => ({ email, role: "user" }));

        try {
          await axios.post("/api/admin/bulk-add-users", newUsers);
          toast({
            title: "Users Imported",
            description: `${newUsers.length} users have been imported successfully.`,
          });
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to import users.",
            variant: "destructive",
          });
        }
      };
      reader.readAsText(file);
    }
  };

  const handleWhitelistAdd = () => {
    if (newWhitelist && !whitelist.includes(newWhitelist)) {
      setWhitelist([...whitelist, newWhitelist]);
      toast({
        title: "Domain Whitelisted",
        description: `${newWhitelist} has been added to the whitelist.`,
      });
    }
  };

  const handleWhitelistRemove = (domain: string) => {
    setWhitelist(whitelist.filter((d) => d !== domain));
    toast({
      title: "Domain Removed",
      description: `${domain} has been removed from the whitelist.`,
    });
  };

  const isValidEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
  };

  const isWhitelisted = (email: string) => {
    if (whitelist.length === 0) return true; // Allow all if no whitelist set
    return whitelist.some((domain) => email.endsWith(`@${domain}`));
  };

  if (isLoading) {
    return <Loading />
  }

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">Admin - User Management</h1>
      <Tabs defaultValue="manual">
        <TabsList>
          <TabsTrigger value="manual">Manual Entry</TabsTrigger>
          <TabsTrigger value="bulk">Bulk Upload</TabsTrigger>
          <TabsTrigger value="whitelist">Domain Whitelist</TabsTrigger>
        </TabsList>

        <TabsContent value="manual">
          <FormWrapper
            title="Add New User"
            description="Manually add a new user to the system."
          >
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleManualEntry)}
                className="space-y-4"
              >
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
                <Button className="flex w-full" type="submit">
                  <UserPlus className="mr-2 h-4 w-4" /> Add User
                </Button>
              </form>
            </Form>
          </FormWrapper>
        </TabsContent>

        <TabsContent value="bulk">
          <FormWrapper
            title="Bulk Upload"
            description="Upload a file to add multiple users."
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
            <p className="text-sm text-gray-500 pt-4">
              File should contain email addresses, one per line.
            </p>
          </FormWrapper>
        </TabsContent>

        <TabsContent value="whitelist">
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
                    <span>{domain}</span>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleWhitelistRemove(domain)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </div>
          </FormWrapper>
        </TabsContent>
      </Tabs>
    </div>
  );
}
