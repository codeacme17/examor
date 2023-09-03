import { MessagePlugin, type UploadFile } from 'tdesign-vue-next'

/**
 * Checks if a given file has a valid type for uploading.
 *
 * @param file - The file object to be checked.
 * @returns Returns true if the file type is valid, otherwise returns false.
 */
export const detectLegalFile = (file: UploadFile): boolean => {
  if (file.type !== 'text/markdown' && file.type !== 'text/x-markdown') {
    MessagePlugin.warning(
      `The type of file '${file.name}' is wrong, Only '.md' type files are allowed to be uploaded`
    )
    return false
  } else return true
}
