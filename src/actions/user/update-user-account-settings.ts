"use server"

import type { ServerResponse } from "@/types/auth/server-response"

import { type UserSettings, UserSettingsSchema } from "@/types/forms/update-user-account-settings"
import VerifyUUIDSchema from "@/types/forms/verify-id"

import prisma from "@/lib/database/prisma"

export default async function updateUserAccountSettings(
    userId: string,
    formData: UserSettings,
): Promise<ServerResponse> {
    try {
        const { id: validatedUserId } = VerifyUUIDSchema.parse({ id: userId })
        const { firstName, isTwoFactorEnabled, lastName } = UserSettingsSchema.parse(formData)

        const user = await prisma.user.update({
            data: {
                firstName,
                isTwoFactorEnabled,
                lastName,
            },
            where: {
                id: validatedUserId,
            },
        })

        // remove encrypted password from user object
        user.encryptedPassword = ""

        if (!user) return { error: `Error Updating User Account Settings`, status: 400 }
        return { status: 200, success: `Successfully Updated User Account Settings`, user }
    } catch (error) {
        console.error(`Error Updating User Account Settings: ${error}`)
        return { error: "Error Updating User Account Settings", status: 400 }
    }
}
