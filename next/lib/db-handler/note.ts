import { prismadb } from '.'

const create = async (data: any) => {
  const note = await prismadb.tNote.create({
    data,
  })

  return note
}

const deleteNote = async (id: string) => {
  const transaction = await prismadb.$transaction(async (prisma) => {
    await prisma.tQuestion.deleteMany({
      where: { noteId: id },
    })

    await prisma.tDocument.deleteMany({
      where: { noteId: id },
    })

    await prisma.tFile.deleteMany({
      where: { noteId: id },
    })

    return prisma.tNote.delete({
      where: { id },
    })
  })

  return transaction
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

export const noteHandler = { create, deleteNote, getAll, update, isExist }
