import { prismadb } from ".";
import type { TDocument } from "@prisma/client";

const create = async (
  noteId: string,
  fileId: string,
  fileName: string,
  content: string
) => {
  try {
    const document = await prismadb.tDocument.create({
      data: {
        noteId,
        fileId,
        fileName,
        document: content,
      } as TDocument,
    });

    return document;
  } catch (error) {
    console.error("error creating document", error);
    throw error;
  }
};

export const documentHandler = { create };
