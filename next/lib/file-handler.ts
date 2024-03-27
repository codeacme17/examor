import fs from 'node:fs/promises'
import path from 'path'

export const uploadFile = async (id: number, file: File) => {
  try {
    const dirPath = path.join(process.cwd(), `public/temp/${id}`)
    await fs.mkdir(dirPath, { recursive: true })
    const filePath = path.join(dirPath, file.name)
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filePath, buffer)
  } catch (err) {
    console.log('[uploadFile] Error: ', err)
    throw new Error('Failed to upload file')
  }
}

export const deleteTempDir = async () => {
  try {
    const filePath = path.join(process.cwd(), `public/temp`)
    await fs.rm(filePath, { recursive: true })
  } catch (err) {
    console.log('[deleteFile] Error: ', err)
    throw new Error('Failed to delete file')
  }
}
