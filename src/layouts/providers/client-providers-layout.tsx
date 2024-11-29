"use client"

import { type ReactNode } from "react"

import { Provider as ReduxProvider } from "react-redux"

import { NuqsAdapter } from "nuqs/adapters/next/app"
import { NextAppDirEmotionCacheProvider } from "tss-react/next/appDir"

import ReactQueryClientProvider from "@/layouts/providers/query-client-provider"
import ThemeProvider from "@/layouts/providers/theme-provider"
import { store } from "@/store"

type LayoutProps = {
    children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
    return (
        <NextAppDirEmotionCacheProvider options={{ key: "nextjs-app-router-mui-template" }}>
            <ReduxProvider store={store}>
                <ThemeProvider>
                    <NuqsAdapter>
                        <ReactQueryClientProvider>{children}</ReactQueryClientProvider>
                    </NuqsAdapter>
                </ThemeProvider>
            </ReduxProvider>
        </NextAppDirEmotionCacheProvider>
    )
}
