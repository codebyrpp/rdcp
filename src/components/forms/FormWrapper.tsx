import { ReactNode } from "react"
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "../ui/card"

const FormWrapper = ({
    title,
    description,
    children }: {
        title: string,
        description?: string | undefined,
        children: ReactNode
    }) => {
    return <>
        <Card>
            <CardHeader>
                <CardTitle>
                    {title}
                </CardTitle>
                {
                    description &&
                    <CardDescription>
                        {description}
                    </CardDescription>
                }
            </CardHeader>
            <CardContent>
                {children}
            </CardContent>
        </Card>
    </>
}

export default FormWrapper;