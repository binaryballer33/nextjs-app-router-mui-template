"use client"

import { type ReactNode } from "react"

import "@/i18n/i18n"
import { ThemeProvider as NextThemesProvider } from "next-themes"
import { type ThemeProviderProps as NextThemesProviderProps } from "next-themes/dist/types"

import { Toaster } from "@/components/ui/sonner"

import "@/global.css"

type ThemeProviderProps = {
    children: ReactNode
    props?: NextThemesProviderProps
}

export default function ThemeProvider({ children, props }: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            value={{ dark: "dark", light: "light", system: "system" }}
            {...props}
        >
            <div className="flex min-h-screen">
                {children}
                <Toaster closeButton duration={3000} position="top-right" richColors />
            </div>
        </NextThemesProvider>
    )
}
