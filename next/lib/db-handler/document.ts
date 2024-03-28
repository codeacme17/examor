import { prismadb } from '.'

const create = async (
  noteId: number,
  fileId: number,
  fileName: string,
  content: string
) => {
  const document = await prismadb.tDocument.create({
    data: {
      noteId,
      fileId,
      fileName,
      document: content,
    },
  })

  return document
}

export const documentHandler = { create }
