import { prismadb } from '.'

const create = async (data: any) => {
  const note = await prismadb.tNote.create({
    data,
  })

  return note
}

const getAll = async () => {
  const notes = await prismadb.tNote.findMany()

  return notes
}

const update = async (id: string, data: any) => {
  const note = await prismadb.tNote.update({
    where: { id },
    data: { ...data },
  })

  return note
}

const isExist = async (name: string) => {
  const note = await prismadb.tNote.findFirst({
    where: { name },
  })

  return !!note
}

export const noteHandler = { create, getAll, update, isExist }
