import { prismadb } from '.'
import { ProfileType } from '@/types/global'
import { PROFILE_DEFAULT } from '../contants'

const init = async () => {
  let profile = await prismadb.tProfile.findFirst()

  if (profile) profile
  else
    profile = await prismadb.tProfile.create({
      data: {
        id: 1,
        ...PROFILE_DEFAULT,
      },
    })

  return profile
}

const update = async (data: ProfileType) => {
  const { id, ...rest } = data

  const profile = await prismadb.tProfile.update({
    where: { id },
    data: rest,
  })

  return profile
}

const getFirst = async () => {
  const profile = await prismadb.tProfile.findFirst()
  return profile
}

export const profileHandler = { init, update, getFirst }
