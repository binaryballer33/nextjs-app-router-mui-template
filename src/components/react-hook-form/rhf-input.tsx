"use client"

import { useFormContext } from "react-hook-form"

import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { X } from "lucide-react"



type RHFInputProps = {
    className?: string
    name: string
}  & React.InputHTMLAttributes<HTMLInputElement>

export default function RHFInput(props: RHFInputProps) {
    const { className, name, placeholder, type } = props

    const { control, setValue } = useFormContext()

    return (
        <FormField
            control={control}
            name={name}
            render={({ field }) => (
                <FormItem>
                    <FormLabel className="font-medium flex items-center justify-center h-8">
                        {name}
                    </FormLabel>


                    <FormControl>
                        <div className="relative">
                            <Input
                                {...field}
                                className={cn(
                                    "bg-muted/50 pl-10",
                                    className
                                )}
                                placeholder={placeholder}
                                type={type}
                            />

                            {/* Icon on the far right of the input field, used to clear the text in the field */}
                            {field.value && (
                                <button
                                className="absolute inset-y-0 right-3 flex items-center"
                                onClick={() => setValue(name, "")}
                                type="button"
                                >
                                <X className="h-5 w-5 text-gray-400" />
                                </button>
                            )}
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}
