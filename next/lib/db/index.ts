import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const initProfile = async () => {
  const profile = await prisma.tProfile.findFirst()

  if (profile) return

  await prisma.tProfile.create({
    data: {
      id: 1,
      questionAmount: 12,
      currentModel: 'openai',
      currentRole: 'examiner',
      openaiModel: 'gpt-3.5-turbo',
      openaiBase: 'https://api.openai.com',
    },
  })
}
