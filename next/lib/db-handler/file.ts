import { prismadb } from '.'

const create = async (noteId: string, rawFile: File) => {
  const { name } = rawFile

  const file = await prismadb.tFile.create({
    data: {
      noteId,
      fileName: name,
    },
  })

  return file
}

const update = async (id: string, data: any) => {
  const file = await prismadb.tFile.update({
    where: { id },
    data: { ...data },
  })

  return file
}

const getById = async (id: string) => {
  const file = await prismadb.tFile.findUnique({
    where: { id },
  })

  return file
}

const getFilesByNoteId = async (noteId: string) => {
  const files = await prismadb.tFile.findMany({
    where: { noteId },
  })

  return files
}

const findUploading = async () => {
  const files = await prismadb.tFile.findMany({
    where: { isUploading: '1' },
  })

  return files
}

export const fileHandler = {
  create,
  update,
  findUploading,
  getFilesByNoteId,
  getById,
}
