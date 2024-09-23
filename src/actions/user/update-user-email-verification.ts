import type { ServerResponse } from "src/types/auth/server-response"

import prisma from "src/utils/database/prisma" // TODO: figure out where you are using linkAccount event and if this function is necessary

// TODO: figure out where you are using linkAccount event and if this function is necessary
export default async function updateUserEmailVerification(userId: string): Promise<ServerResponse> {
    try {
        const user = await prisma.user.update({
            data: {
                emailVerified: new Date(),
            },
            where: {
                id: userId,
            },
        })

        if (!user) return { error: `Error Updating User Email Verification`, status: 400 }
        return { status: 200, success: `Successfully Updated User Email Verification`, user }
    } catch (error) {
        console.error(`Error Updating User Email Verification: ${error}`)
        return { error: "Error Updating User Email Verification", status: 400 }
    }
}
