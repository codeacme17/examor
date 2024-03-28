import { prismadb } from '.'

const create = async (noteId: number, rawFile: File) => {
  const { name } = rawFile

  const file = await prismadb.tFile.create({
    data: {
      noteId,
      fileName: name,
    },
  })

  return file
}

const update = async (id: number, data: any) => {
  const file = await prismadb.tFile.update({
    where: { id },
    data: { ...data },
  })

  return file
}

const getById = async (id: number) => {
  const file = await prismadb.tFile.findUnique({
    where: { id },
  })

  return file
}

export const fileHandler = { create, update, getById }
