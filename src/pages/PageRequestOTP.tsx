import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
import Brand from "@/components/common/Brand";
import { toast, useToast } from "@/components/ui/use-toast";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"; // Import tooltip components
import { REGISTER_CONFIRMATION_ROUTE, REGISTER_ROUTE, RESET_PASSWORD_ROUTE } from "@/constants/routes";

const EmailSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }),
});

export function PageRequestOTP() {
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const navigate = useNavigate();
  const [pageForm, setPageForm] = useState({
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

  const handleSubmit = (data: z.infer<typeof EmailSchema>) => {

    // TODO: send request, wait for response
    
    // if response is successful, show toast and navigate to appropriate page
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
  };

  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname === REGISTER_ROUTE) {
      setPageForm({
        name: "Register",
        description: "Enter your email to receive a one-time password.",
      });
    } else {
      setPageForm({
        name: "Forgot Password",
        description: "Enter your email to receive a one-time password.",
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
                      placeholder="Enter your email address"
                      type="email"
                      {...field}
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button className="flex w-full" type="submit">
                    Send OTP
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Click to receive a one-time password via email.</p>
                </TooltipContent>
              </Tooltip>
            </form>
          </Form>
        </FormWrapper>
      </div>
    </TooltipProvider>
  );
}
