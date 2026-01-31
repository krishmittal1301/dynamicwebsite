import { PrismaClient } from '@prisma/client'

const globalForPrisma = global as unknown as { prisma: PrismaClient }

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: ['query'], // This helps you see the actual SQL in your terminal!
  })

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma