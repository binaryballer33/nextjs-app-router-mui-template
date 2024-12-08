// noinspection ES6ConvertVarToLetConst

import { NODE_ENV } from "@/lib/secrets"
import { PrismaClient } from "@prisma/client"

declare global {
    // eslint-disable-next-line no-var,vars-on-top
    var prisma: PrismaClient | undefined
}

const prisma = global.prisma || new PrismaClient({ log: NODE_ENV === "development" ? ["error", "warn"] : ["error"] })

export default prisma

if (NODE_ENV !== "production") global.prisma = prisma