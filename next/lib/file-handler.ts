import fs from 'node:fs/promises'
import path from 'path'

export const uploadFile = async (file: File) => {
  try {
    if (file.type !== 'text/markdown') throw new Error('Invalid file type')
    const dirPath = path.join(process.cwd(), `public/temp/`)
    await fs.mkdir(dirPath, { recursive: true })
    const filePath = path.join(dirPath, file.name)
    const buffer = Buffer.from(await file.arrayBuffer())
    await fs.writeFile(filePath, buffer)
    return filePath
  } catch (err) {
    console.log('[uploadFile] Error: ', err)
    throw new Error(err as string)
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

export const readFileContent = async (filePath: string) => {
  try {
    const buffer = await fs.readFile(filePath, 'utf-8')
    return buffer.toString()
  } catch (err) {
    console.log('[readFileContent] Error: ', err)
    throw new Error('Failed to read file content')
  }
}
