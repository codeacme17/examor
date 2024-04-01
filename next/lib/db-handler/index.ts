import { PrismaClient } from '@prisma/client'

declare global {
  var prisma: PrismaClient | undefined
}

export const prismadb = globalThis.prisma || new PrismaClient()

if (process.env.NODE_ENV === 'development') globalThis.prisma = prismadb

export { noteHandler } from './note'
export { fileHandler } from './file'
export { documentHandler } from './document'
export { profileHandler } from './profile'
