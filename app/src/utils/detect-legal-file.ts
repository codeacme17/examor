import { MessagePlugin, type UploadFile } from 'tdesign-vue-next'

const MIME = {
  MARKDOWN: 'text/markdown',
  X_MARKDOWN: 'text/x-markdown',
  TEXT_PLAIN: 'text/plain',
  OCTET_STREAM: 'application/octet-stream',
}

/**
 * Checks if a given file has a valid type for uploading.
 *
 * @param file - The file object to be checked.
 * @returns Returns true if the file type is valid, otherwise returns false.
 */
export const detectLegalFile = (file: UploadFile): boolean => {
  if (!isValidMarkdownFile(file)) {
    MessagePlugin.warning(
      `The type of file '${file.name}' is wrong, Only "Markdown" type files are allowed to be uploaded`
    )
    return false
  } else return true
}

/**
 * Checks if a given file is a valid Markdown file based on its name and MIME type.
 * @param file - The file to check.
 * @returns Returns true if the file is a valid Markdown file, otherwise false.
 */
const isValidMarkdownFile = (file: UploadFile): boolean => {
  const { name, type } = file
  if (!name!.endsWith('.md')) return false
  if (
    type === MIME.MARKDOWN ||
    type === MIME.X_MARKDOWN ||
    type === MIME.TEXT_PLAIN ||
    type === MIME.OCTET_STREAM
  ) {
    return true
  } else return false
}
