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
import { useLocation } from "react-router-dom";
import { REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from "@/constants/routes";

const AccountSetupFormSchema = z.object({
  email: z.string().email({
    message: "Please enter a valid email address.",
  }),
  otp: z.string().length(6, {
    message: "Your one-time password must be 6 characters.",
  }),
  password: z.string().min(8, {
    message: "Your password must be at least 8 characters.",
  }),
  confirmPassword: z.string().min(8, {
    message: "Your password must be at least 8 characters.",
  }),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export default function OTPPage() {

  // current route
  const { pathname } = useLocation();

  const [pageForm, setPageForm] = useState({
    name: "",
    description: "",
  });

  // base on the current route, set the form name and description
  useEffect(() => {
    if (pathname === RESET_PASSWORD_ROUTE) {
      setPageForm({
        name: "RESET PASSWORD",
        description: "Enter the OTP sent to your email.",
      });
    } else if (pathname === REGISTER_ROUTE) {
      setPageForm({
        name: "Register",
        description: "Enter the OTP sent to your email.",
      });
    }
  }, [pathname]);

  const form = useForm<z.infer<typeof AccountSetupFormSchema>>({
    resolver: zodResolver(AccountSetupFormSchema),
    defaultValues: {
      otp: "",
    },
  });

  function onSubmit(data: z.infer<typeof AccountSetupFormSchema>) {

  }

  return (
    <div className="flex flex-col gap-y-4 h-screen justify-center items-center">
      <Brand />
      <FormWrapper
        title={pageForm.name}
        description={pageForm.description}
      >
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-2 w-80"
          >
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
                    Please enter the one-time password sent to your email.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button className="flex w-full" type="submit">
              Submit
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
}
