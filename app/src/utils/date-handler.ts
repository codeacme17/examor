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
