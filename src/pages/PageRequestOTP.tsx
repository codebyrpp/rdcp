import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import FormWrapper from "@/components/forms/FormWrapper";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import Brand from "@/components/common/Brand";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import tooltip components
import { REGISTER_CONFIRMATION_ROUTE, REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from "@/constants/routes";
import { useAccountSetupMutation, useForgotPasswordMutation } from "@/state/apiSlices/authApi";

const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export function PageRequestOTP() {
  const navigate = useNavigate();
  const [pageForm, setPageForm] = useState<{
    name: string;
    description?: string;
  }>({
    name: "",
    description: "",
  });

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();

  const [accountSetup, { isLoading }] = useAccountSetupMutation();
  const [forgotPassword, { isLoading: forgotPasswordLoading }] = useForgotPasswordMutation();

  const handleSubmit = (data: z.infer<typeof EmailSchema>) => {

    // get email from form data
    const email = data.email;
    let res = null;
    // if pathname is register, call accountSetup mutation, else call forgotPassword mutation
    res = pathname === REGISTER_ROUTE ? accountSetup({ email }).unwrap() : forgotPassword({ email }).unwrap();

    res.then((res) => {
      // if response is successful, show toast and navigate to appropriate page
      if (res.error) {
        toast({
          title: "Something went wrong",
          description: res.error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "OTP Sent",
        description: `An OTP has been sent to ${data.email}`,
        variant: "success",
        duration: 5000,
      });

      const state = { email: data.email };
      if (pathname === REGISTER_ROUTE) {
        navigate(REGISTER_CONFIRMATION_ROUTE, { state });
      } else {
        navigate(RESET_PASSWORD_ROUTE, { state });
      }
    });

  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === REGISTER_ROUTE) {
      setPageForm({
        name: "Account Setup",
      });
    } else {
      setPageForm({
        name: "Forgot Password",
        description: "Enter the email associated with your account to receive a one-time password.",
      });
    }
  }, [pathname]);

  return (
    <TooltipProvider>
      <div className="flex flex-col gap-y-4 h-screen justify-center items-center">
        <Brand />
        <FormWrapper
          title={pageForm.name}
          description={pageForm.description}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(handleSubmit)}
              className="space-y-2 w-80"
            >
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <Input
                      placeholder=""
                      className="w-full"
                      type="email"
                      {...field}
                    />
                    <FormDescription>
                      Enter the email address for which you are entitled to create an account in the platform.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="flex w-full" type="submit" disabled={isLoading || forgotPasswordLoading}>
                {
                  isLoading || forgotPasswordLoading ? 'Sending OTP...' : 'Send OTP'
                }
              </Button>
            </form>
          </Form>
        </FormWrapper>
      </div>
    </TooltipProvider>
  );
}
