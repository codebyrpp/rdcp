'use client'

import * as React from 'react'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { EyeIcon, EyeOffIcon } from "lucide-react"

type PasswordInputProps = {
    value: string;
    onChange: (value: string) => void;
}

export default function PasswordInput({ value, onChange }: PasswordInputProps) {
    const [showPassword, setShowPassword] = React.useState(false)

    return (
        <div className="relative w-full max-w-sm">
            <Input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                className="pr-10"
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
            <Button
                type="button"
                variant="ghost"
                size="icon"
                className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
            >
                {showPassword ? (
                    <EyeOffIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                ) : (
                    <EyeIcon className="h-4 w-4 text-gray-500" aria-hidden="true" />
                )}
            </Button>
        </div>
    )
}