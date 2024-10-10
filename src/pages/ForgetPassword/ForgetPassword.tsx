import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
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
import { VERIFY_OTP_ROUTE } from "@/constants/routes";
import Brand from "@/components/common/Brand";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import tooltip components

const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export default function ForgotPasswordPage() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof EmailSchema>>({
    resolver: zodResolver(EmailSchema),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();

  const handleSubmit = (data: z.infer<typeof EmailSchema>) => {
    // Simulate successful email submission
    setEmailSubmitted(true);
    toast({
      title: "OTP Sent",
      description: `An OTP has been sent to ${data.email}`,
      variant: "success",
      duration: 5000,
    });
    navigate(VERIFY_OTP_ROUTE); // Redirect to OTP page
  };

  return (
    <div className="flex flex-col gap-y-4 h-screen justify-center items-center" data-testid="forgot-password-form">
      <Brand />
      <FormWrapper
        title="Forgot Password"
        description="Enter your email to receive a one-time password."
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
                  <FormControl>
                    <Input
                      placeholder="Enter your email address"
                      type="email"
                      {...field}
                      data-testid="email-input"
                    />
                  </FormControl>
                  <FormMessage  data-testid="otp-email-input-message" />
                </FormItem>
              )}
            />
            <Button className="flex w-full" type="submit" data-testid="otp-send-button">
              Send OTP
            </Button>
          </form>
        </Form>
      </FormWrapper>
    </div>
  );
}
