"use client"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import FormWrapper from "@/components/forms/FormWrapper"
import { useLoginFormViewModel } from "@/viewmodels/login"
import { useNavigate } from "react-router-dom"
import { FORGOT_PASSWORD_ROUTE } from "@/constants/routes"
import PasswordInput from "../common/PasswordInput"


export default function LoginForm() {

  const navigate = useNavigate()
  const handleForgetPassword = () => {
    navigate(FORGOT_PASSWORD_ROUTE)
  }
  const { form, handleLogin, isLoading, isError, errorMessage } = useLoginFormViewModel()

  return (
    <FormWrapper title="Sign In"
      description="to access your projects and forms">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleLogin)} className="space-y-2 w-80">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="This is your public display name." {...field} data-testid="email-input" />
                </FormControl>
                <FormMessage data-testid="email-input-message" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <PasswordInput {...field} data-testid="password-input" />
                </FormControl>
                <FormDescription>

                </FormDescription>
                <FormMessage data-testid="password-input-message"/>
              </FormItem>
            )}
          />

          <Button className="flex w-full" type="submit" disabled={isLoading} data-testid="login-button">
            {isLoading ? 'Logging in...' : 'Login'}
          </Button>

          {isError && (
            <p className="text-red-500 mt-2 text-sm" data-testid="invalid-credentials-message">
              {errorMessage || 'Failed to login. Please try again.'}
            </p>
          )}
        </form>
      </Form>
      <div className="flex justify-center">
        <Button onClick={handleForgetPassword} className="mt-3" variant={"link"} data-testid="forgot-passsword">
          Forgot your password?
        </Button>
      </div>
    </FormWrapper>
  )
}

