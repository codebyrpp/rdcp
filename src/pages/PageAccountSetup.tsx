"use client";

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
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "@/components/ui/use-toast";
import FormWrapper from "@/components/forms/FormWrapper";
import Brand from "@/components/common/Brand";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import Tooltip components
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { LOGIN_ROUTE, REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import Loading, { PageLoading } from "@/components/common/Loading";
import { useAccountSetupVerifyMutation, useResetPasswordMutation } from "@/state/apiSlices/authApi";

const AccountSetupFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  otp: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  password: z.string().min(8, {
    message: "Your password must be at least 8 characters.",
  }).regex(new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])"), {
    message: "Your password must contain at least one uppercase letter, one lowercase letter, and one number.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Your password must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function AccountSetupPage() {

  // current route
  const { pathname, state } = useLocation();
  const [loading, setLoading] = useState(true);

  // if state is not defined, go back to the previous page
  useEffect(() => {
    if (!state || state.email === undefined) {
      window.history.back();
    } else {
      setLoading(false);
    }
  }, [state]);


  /// set the page form name and description
  const [pageForm, setPageForm] = useState<{
    name: string;
    description?: string;
  }>({
    name: "",
    description: "",
  });

  // base on the current route, set the form name and description
  useEffect(() => {
    let name = "Account Setup";
    if (pathname === RESET_PASSWORD_ROUTE) {
      name = "Reset Password";
    } else if (pathname === REGISTER_ROUTE) {
      name = "Register";
    }
    setPageForm({
      name,
    });
  }, [pathname]);

  const form = useForm<z.infer<typeof AccountSetupFormSchema>>({
    resolver: zodResolver(AccountSetupFormSchema),
    defaultValues: {
      email: state?.email || "",
      otp: "",
      password: "",
      confirmPassword: "",
    },
  });

  const [accountSetup, { isLoading: accountSetupLoading }] = useAccountSetupVerifyMutation();
  const [resetPassword, { isLoading: resetPasswordLoading }] = useResetPasswordMutation();
  const navigate = useNavigate();

  function onSubmit(data: z.infer<typeof AccountSetupFormSchema>) {
    // prepare body
    const body = {
      email: data.email,
      otp: data.otp,
      password: data.password,
    };

    // if pathname is register, call accountSetup mutation, else call resetPassword mutation

    let res = pathname === REGISTER_ROUTE ? accountSetup(body).unwrap() : resetPassword(body).unwrap();

    res.then((res) => {
      if (res.error) {
        toast({
          title: "Something went wrong",
          description: res.error.message,
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Success",
        description: "Your password has been reset.",
        variant: "success",
        duration: 5000,
      });

      navigate(LOGIN_ROUTE);
    });
  }

  if (loading) {
    return <PageLoading />;
  }

  return (
    <div className="flex flex-col gap-y-4 h-screen justify-center items-center">
      <Brand />
      <div className="mt-2 md:max-w-[30vw] min-w-[30vw]">
        <FormWrapper
          title={pageForm.name}
          description={pageForm.description}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="space-y-2 w-90"
            >
              {/* Password */}
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="input"
                        {...field}
                      />
                    </FormControl>
                    <div className="text-sm">
                      Your password must contain:
                      <ul className="list-disc px-6">
                        <li>At least 8 characters</li>
                        <li>At least one uppercase letter</li>
                        <li>At least one lowercase letter</li>
                        <li>At least one number</li>
                      </ul>
                    </div>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Confirm Password */}
              <FormField
                control={form.control}
                name="confirmPassword"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Confirm Password</FormLabel>
                    <FormControl>
                      <Input
                        type="password"
                        className="input"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Please re-enter your password.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* OTP */}
              <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>One-Time Password</FormLabel>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <FormControl>
                            <InputOTP maxLength={6} {...field}>
                              <InputOTPGroup>
                                <InputOTPSlot index={0} />
                                <InputOTPSlot index={1} />
                                <InputOTPSlot index={2} />
                                <InputOTPSlot index={3} />
                                <InputOTPSlot index={4} />
                                <InputOTPSlot index={5} />
                              </InputOTPGroup>
                            </InputOTP>
                          </FormControl>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Enter the 6-digit code sent to your email.</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                    <FormDescription>
                      {
                        `Enter the one-time password sent to ${state?.email}`
                      }
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="flex w-full mt-3">
                Submit
              </Button>
            </form>
          </Form>
        </FormWrapper>
      </div>
    </div>
  );
}
