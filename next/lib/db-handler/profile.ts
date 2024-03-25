import { PrismaClient } from '@prisma/client'
import { ProfileType } from '@/types/global'

const prisma = new PrismaClient()

const init = async () => {
  let profile = await prisma.tProfile.findFirst()
  console.log(profile)

  if (profile) profile
  else
    profile = await prisma.tProfile.create({
      data: {
        id: 1,
        questionAmount: 12,
        currentModel: 'openai',
        currentRole: 'examiner',
        openaiModel: 'gpt-3.5-turbo',
        openaiBase: 'https://api.openai.com',
      },
    })

  return profile
}

const update = async (data: ProfileType) => {
  // prisma.tProfile.update()
}

export const profileHandler = { init, update }
