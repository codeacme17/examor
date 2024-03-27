import { prismadb } from '.'

const create = async (data: any) => {
  const note = await prismadb.tNote.create({
    data,
  })

  return note
}

export const noteHandler = { create }
