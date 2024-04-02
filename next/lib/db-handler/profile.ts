import { prismadb } from '.'
import { ProfileType } from '@/types/global'
import { PROFILE_DEFAULT } from '../contants'
import { TProfile } from '@prisma/client'

const init = async () => {
  let { id, ...profile } = await getFirst()

  if (profile) profile
  else
    profile = await prismadb.tProfile.create({
      data: PROFILE_DEFAULT,
    })

  return profile
}

const update = async (data: ProfileType) => {
  let { id } = await getFirst()

  const { id: _id, ...profile } = await prismadb.tProfile.update({
    where: { id },
    data,
  })

  return profile
}

const getFirst = async () => {
  const profile = (await prismadb.tProfile.findFirst()) as TProfile

  return profile
}

export const profileHandler = { init, update, getFirst }
