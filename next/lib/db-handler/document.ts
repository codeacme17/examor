import { prismadb } from '.'

const create = async (
  noteId: string,
  fileId: string,
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
