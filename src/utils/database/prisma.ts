import type { Prisma } from "@prisma/client"
import { PrismaClient } from "@prisma/client"
import type { DefaultArgs } from "@prisma/client/runtime/library"

const prismaClientSingleton = () => {
    return new PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>()
}

type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

const globalForPrisma = globalThis as unknown as {
    prisma: PrismaClientSingleton | undefined
}

const prisma = globalForPrisma.prisma ?? prismaClientSingleton()

export default prisma

if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma
