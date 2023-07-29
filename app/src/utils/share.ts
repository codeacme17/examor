// format "xxxx-xx-xxT00:00:00" data structure to "xxxx-xx-xx"
export const handleDatetime = (datatime: string): string => {
  const chunks = datatime.split('T')
  if (chunks.length <= 1) return datatime
  return chunks[0]
}
