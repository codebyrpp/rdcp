import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useSession from "@/hooks/useSession"
import { useLoginMutation } from "@/state/apiSlices/authApi"
import { useState } from "react"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const useLoginFormViewModel = () => {

    const { sessionLogin } = useSession();
    const [loginMutation, { isLoading, isError, error }] = useLoginMutation();
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleLogin = async (values: z.infer<typeof formSchema>) => {
        try {
            const { email, password } = values;

            // Send a login request to the server
            const userData = await loginMutation({ email, password }).unwrap();

            // Simulate a login request
            sessionLogin({
                user: {
                    email: userData.email,
                    role: userData.role,
                },
                token: userData.jwt,
            });

        } catch (error) {
            // setErrorMessage("Failed to Login"); //TODO: Improve error handling
            const fetchError = error as FetchBaseQueryError;
            if (fetchError.status === 401) {
                setErrorMessage("Invalid Credentials");
            } else {
                setErrorMessage("Failed to Login, try again later");
            }
        }
    }

    return { form, handleLogin, isLoading, isError, error, errorMessage }
}
