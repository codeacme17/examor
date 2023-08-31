import { MessagePlugin } from 'tdesign-vue-next'

/**
 * Extracts the date portion from a datetime string in 'YYYY-MM-DDTHH:mm:ss' format.
 *
 * @param {string} datetime - The input datetime string.
 * @returns {string} The date portion extracted from the datetime string, or the original string if the format is invalid.
 * @example "xxxx-xx-xxT00:00:00" to "xxxx-xx-xx"
 */
export const handleDatetime = (datatime: string): string => {
  const chunks = datatime.split('T')
  if (chunks.length <= 1) return datatime
  return chunks[0]
}

/**
 * Checks if a given file has a valid type for uploading.
 *
 * @param {Object} file - The file object to be checked.
 * @returns {boolean} Returns true if the file type is valid, otherwise returns false.
 */
export const detectLegalFileName = (file: any) => {
  if (file.type !== 'text/markdown' && file.type !== 'text/x-markdown') {
    MessagePlugin.warning("Only '.md' type files are allowed to be uploaded")
    return false
  } else return true
}
