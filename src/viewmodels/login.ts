import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import useSession from "@/hooks/useSession"

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
})

export const useLoginFormViewModel = () => {

    const { login } = useSession()

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            const { email } = values;

            // Simulate a login request
            login({
                user: {
                    id: 1,
                    email,
                    role: "user"
                },
                token: "jwt"
            });

        } catch (error) {
            console.error("Login failed:", error)
            // Handle error (e.g., show error message to the user)
        }
    }

    return { form, handleSubmit }
}
