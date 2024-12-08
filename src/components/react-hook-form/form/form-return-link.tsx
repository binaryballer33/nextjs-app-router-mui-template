import type { ButtonProps } from "@/components/ui/button"

import Link from "next/link"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ArrowLeft } from "lucide-react"

type FormReturnLinkProps = {
    className?: string
    href: string
    size?: ButtonProps["size"]
    title: string
    variant?: ButtonProps["variant"]
}

export default function FormReturnLink(props: FormReturnLinkProps) {
    const { className, href, size = "sm", title, variant = "ghost" } = props

    return (
        <Button asChild className={cn("mt-6 gap-2", className)} size={size} variant={variant}>
            <Link href={href}>
                <ArrowLeft className="h-4 w-4" />
                {title}
            </Link>
        </Button>
    )
}
